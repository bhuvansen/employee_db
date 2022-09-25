import React from "react"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import "./Task.css"
const TaskUI = ({ list, onEditClick, handleChange, onUpdateClick, onCancelClick, onDeleteClick, otherState, onAddNewClick, handleNewEmp, onAddClick, onNewCancelClick, loadTable, salaryType, loadSalary }) => {
  const {addNew, newEmployee} = otherState
  let salaryArray = []
  salaryArray = list.map((item) => {
    return item.employee_salary
  })
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => {
            return (
                <tr key={item.id}>
                  <td>
                    {!item.editMode ? (
                      item.employee_name
                    ) : (
                      <input
                        type="text"
                        id = {item.id-1}
                        value={item.employee_name}
                        name = "employee_name"
                        onChange={handleChange}
                      />
                    )}
                  </td>
                  <td>
                    {!item.editMode ? (
                      item.employee_dept
                    ) : (
                      <input
                        type="text"
                        id = {item.id-1}
                        value={item.employee_dept}
                        name = "employee_dept"
                        onChange={handleChange}
                      />
                    )}
                  </td>
                  <td>
                    {!item.editMode ? (
                      item.employee_salary
                    ) : (
                      <input
                        type="text"
                        id = {item.id-1}
                        value={item.employee_salary}
                        name = "employee_salary"
                        onChange={handleChange}
                      />
                    )}
                  </td>
                  <td>
                    <div className="action">
                      {!item.editMode && (
                        <Button variant="outline-secondary" id ={item.id-1} onClick={onEditClick}>
                          Edit
                        </Button>
                      )}
                      {item.editMode && (
                        <>
                          <Button variant="outline-secondary" id ={item.id-1} onClick={onUpdateClick} >
                            Update
                          </Button>
                          <Button variant="outline-secondary" id ={item.id-1} onClick={onCancelClick}>
                            Cancel
                          </Button>
                        </>
                      )}
                      {!item.editMode && (
                      <Button variant="outline-danger" id ={item.id} onClick={onDeleteClick} >
                        Delete
                      </Button>)}
                    </div>
                  </td>
                </tr>
            )
          })}
          {addNew && (
            <tr>
              <td>
                <input type="text" name="employee_name" value={newEmployee.employee_name} onChange={handleNewEmp}/>
              </td>
              <td>
                <input type="text" name="employee_dept" value={newEmployee.employee_dept} onChange={handleNewEmp}/>
              </td>
              <td>Rs. 
                <input type="text" name="employee_salary" value={newEmployee.employee_salary} onChange={handleNewEmp}/>
              </td>
              <td>
                <div className="action">
                  <Button variant="outline-danger" onClick={onAddClick}>
                    Add
                  </Button>
                  <Button variant="outline-danger" onClick={onNewCancelClick} >
                    Cancel
                  </Button>
                </div>
              </td>
            </tr>
            )}
        </tbody>
      </Table>
      <div className="action mb-2 mt-2">
        <Button variant="danger" onClick={()=>loadTable("Backend")}>
          Load Backend Department List
        </Button>
        <Button variant="danger" onClick={()=>loadTable("Frontend")}>
          Load Frontend Department List
        </Button>
        <Button variant="danger" onClick={()=>loadTable("all")}>
          Load All Department List
        </Button>
        <Button variant="danger" onClick = {onAddNewClick} disabled={addNew}>
          Add New Detail
        </Button>
      </div>
      <div className="filter">
        <Button variant="success" onClick={()=>loadSalary("lowest")} className="mb-2">
          Lowest Paid Salary
        </Button>
        {salaryType === "lowestSalary" && <span className="mb-2">{salaryArray.length>0 ? "Rs. " + Math.min(...salaryArray) : "No salary found"}</span>}
        <Button variant="success" onClick={()=>loadSalary("highest")} className="mb-2">
          Highest Paid Salary
        </Button>
        {salaryType === "highestSalary" && <span>{salaryArray.length>0 ? "Rs. " +  Math.max(...salaryArray) : "No salary found"}</span>}
      </div>
    </div>
  )
}

export default TaskUI
