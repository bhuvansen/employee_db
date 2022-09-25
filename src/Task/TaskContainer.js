import React, { useEffect, useState } from "react"
import { dummyEmpDetails } from "./SampleValue"
import TaskUI from "./TaskUI"

const TaskContainer = () => {
  const initialStateOther =  {
    addNew: false, 
    newEmployee:{
      id: "",
      employee_name: "",
      employee_salary: "",
      employee_dept: "",
      editMode:false
    }
  }
  const [empTable, setEmpTable] = useState([{}])
  const [backUpDetails, setBackUpDetails] = useState([{}])
  const [otherState, setOtherState] = useState({...initialStateOther, filterMode:false, filteredDetails:[{}], filteredDept :"" })
  const [salaryType, setSalaryType] = useState()


  useEffect(() => {
    //Using JSON stringify and parse for deep cloning as we are using nested object
    let dummyDetails = JSON.parse(JSON.stringify(dummyEmpDetails))
    dummyDetails.map((item) => {
      return (item.editMode = false)
    })
    setEmpTable(JSON.parse(JSON.stringify(dummyDetails)))
    setBackUpDetails(JSON.parse(JSON.stringify(dummyDetails)))
  }, [])

  const onEditClick = (event) => {
    let id = event.target.id
    let array = [...empTable]
    array[id].editMode = true
    setEmpTable(array)
    if(otherState.filterMode){
      setOtherState({...otherState, filteredDetails:array.filter((item) => item.employee_dept === otherState.filteredDept)})
    }
  }

  const handleChange = (event) => {
    let id = event.target.id
    let name = event.target.name
    let value = event.target.value
    let array = [...empTable]
    array[id][name] = value
    setEmpTable(array)
  }

  const onUpdateClick = (event) => {
    let id = event.target.id
    let array = [...empTable]
    array[id].editMode = false
    setEmpTable(JSON.parse(JSON.stringify(array)))
    setBackUpDetails(JSON.parse(JSON.stringify(array)))
    if(otherState.filterMode){
      setOtherState({...otherState, filteredDetails:array.filter((item) => item.employee_dept === otherState.filteredDept)})
    }
  }

  const onCancelClick = (event) => {
    let id = event.target.id
    let array = JSON.parse(JSON.stringify(backUpDetails))
    array[id].editMode = false
    setEmpTable(JSON.parse(JSON.stringify(array)))
    console.log(array)
    if(otherState.filterMode){
      setOtherState({...otherState, filteredDetails:array.filter((item) => item.employee_dept === otherState.filteredDept)})
    }
  }

  const onDeleteClick = (event) => {
    let id = event.target.id
    let empArray = [...empTable].filter((item) => item.id !== parseInt(id))
    for (let i in empArray) {
      if (i >= id - 1) {
        empArray[i].id = parseInt(i) + 1
      }
    }
    setEmpTable(JSON.parse(JSON.stringify(empArray)))
    setBackUpDetails(JSON.parse(JSON.stringify(empArray)))
    console.log("empArray", empArray)
    if(otherState.filterMode){
      setOtherState({...otherState, filteredDetails:empArray.filter((item) => item.employee_dept === otherState.filteredDept)})
    }
  }

  const onAddNewClick=()=>{
    setOtherState({...otherState, addNew:true})
  }

  const handleNewEmp=(event)=>{
    let name = event.target.name
    let value = event.target.value
    if(name==="employee_salary"){
        value = parseInt(value)
    }
    let obj = {...otherState.newEmployee}
    obj[name] = value
    obj.id = empTable.length + 1
    setOtherState({...otherState, newEmployee:obj})
  }

  const onAddClick=()=>{
    setEmpTable([...empTable, otherState.newEmployee])
    if(otherState.filterMode){
      setOtherState({...initialStateOther, filteredDetails:[...empTable, otherState.newEmployee].filter((item) => item.employee_dept === otherState.filteredDept),  filterMode : otherState.filterMode})
    }else{
      setOtherState({...initialStateOther, filterMode : otherState.filterMode})
    }
  }

  const loadTable=(dept)=>{
    if (dept !== "all") {
        setOtherState({...otherState, filteredDetails:empTable.filter((item) => item.employee_dept === dept), filterMode : true, filteredDept:dept})
    } else {
        setOtherState({...otherState, filteredDetails:empTable, filterMode : false, filteredDept:""})
    }
  }

  const loadSalary =(SalaryType)=> {
    if (SalaryType === "lowest") {
      setSalaryType("lowestSalary")
    } else {
      setSalaryType("highestSalary")
    }
  }


  return (
    <TaskUI
      list={otherState.filterMode ? otherState.filteredDetails : empTable}
      onEditClick={onEditClick}
      handleChange={handleChange}
      onUpdateClick={onUpdateClick}
      onCancelClick={onCancelClick}
      onDeleteClick={onDeleteClick}
      otherState = {otherState}
      onAddNewClick={onAddNewClick}
      handleNewEmp={handleNewEmp}
      onAddClick={onAddClick}
      onNewCancelClick={()=>setOtherState({...initialStateOther, filteredDetails:otherState.filterMode ? [...empTable, otherState.newEmployee].filter((item) => item.employee_dept === otherState.filteredDept) :[{}],  filterMode : otherState.filterMode})}
      loadTable={loadTable}
      loadSalary={loadSalary}
      salaryType={salaryType}
    />
  )
}

export default TaskContainer
