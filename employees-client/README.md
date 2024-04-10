# Employee Management Application

Welcome to the Employee Management Application! This application is designed to assist managers only in efficiently managing their employees. Below you'll find an overview of its features and functionalities.

## Features

- Display of all active employees in a table format.
- Search panel to filter employees based on specified criteria via pipe.
- Download option for exporting employee details to an Excel file.
- Edit and delete functionalities for managing employee details.
- Ability to add positions to employees, including management positions.
- User authentication for main administrators.
- Router for seamless navigation between pages.
- Asynchronous and efficient server connection using Observable.
- Aesthetic design utilizing Bootstrap and custom CSS.
- Animated icons provided by Lordicon.com.

## Employee Table

The main page of the application displays a table with the following employees' details:

- ID
- Last Name
- First Name
- Work Start Date

The table is automatically refreshed with each change.

## Search Panel

At the top of the employee table, there is a search panel. You can filter employees by entering specific details.

## Export to Excel

You can download an Excel file containing the details of all existing employees in the table.

## Delete

Clicking on the "delete" button deletes the employee. 

## Add

Clicking on the "Add" button in the head of the table opens you a form to add an employee with the full details.

## Edit

Clicking on the "Edit" button allows you to edit the details of a selected employee. A form will open using FormControl, displaying the employee's complete details. Changes can be saved after appropriate validations.

## Adding Positions

After editing or adding an employee, you have the option to add positions to them. A form will open where you can specify the position name, start date, and whether it's a management position. Positions cannot have a start date earlier than the employee's work start date, and cann't be one position twice to the same employee.
.

## User Authentication

Main administrators can log in using their username and password (user name - "yaelN", password - "123456"). This grants them high privileges, including the ability to add, edit, or delete roles.

## Design and Icons

The project is designed to enhance user experience with aesthetic and visually appealing elements. Bootstrap and custom CSS are used for styling, while animated icons from Lordicon.com add flair to the interface.

For further information or assistance, please contact [Yael Noifeld](ynoy669@gmail.com).

Thank you for using the Employee Management Application!

---

*Icons by [Lordicon.com](https://lordicon.com/).*


