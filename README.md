## Task App

## Techstack used :
- Frappe w/ mariaDB
- React w/ Typescript
- TailwindCSS
- ReduxTK/ Sagas ( Async data handling for frappe restAPIs ) - Framer Motion ( Animations )

## Features developed :
- Create task with title, description, category, priority, status
- Search for task with any keyword
- Update tasks
- Archived tasks ( same as delete, but I have used delete http method) - Responsive w/ all the devices

## Features I would add in the future :
- Creating a sub-task list for each individual task
- Implementing real-time updates from frappe backend - Enabling user sign-up / login-in
- Animations for all user interactions

## Component breakdown :
- I have the App.tsx render all the required components for our application
- Within the component folder I have stored all the parent components such as Topbar,
TaskCreator, TaskList
- Each parent component has their children component which are combine together to create a
fully functional component
- Redux has been used to maintain the state within the frontend, Sagas has been used to
maintain the async data from the backend
Backend Design :
- I have Actions docType ( tasks ) which have props like title, description, category, priority, status
- Actions is connected / linked with Category docType which just give us better classification of
tasks
- I also have Actions task docType (sub-tasks) which I haven’t implemented on the frontend

## Challenges faced :
- Installation of bench maintaining all the dependencies such as mariaDB, redis, nginx, python. - Connecting frappe with react frontend

## Local project set-up :
- Install bench and frappe
- Initialise the bench with bench init and past the github-repo inside a the directory where the
bench was initialised
- New ``folder -> bench init <folder name> && cd <folder name>``
- Paste the git-up repo in a separate folder ``<task_app>`` and paste the ``<task_app>`` inside app
directory of ``<folder name>``
- Create a new site and install the ``<task_app>`` inside the site which contain all the doctype
required for project to work
- Lastly run ``bench start``
- Inside ``<task_app>`` there is a frontend folder which contains the client side code, open that folder and run ``npm install``, to install all the required dependencies
- Replace the baseUrl with the url of the frappe instance running on your device.
- Run the app.
