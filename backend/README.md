### Setting Python Environment 
#### Importance of setting the Python Environment  
#### 1. Dependency Management
- The pythn environment ensures consistency, manageability and proper functionality
- It allows the installation and management of project-specific depencies such as numpy for data processing etc.
- It isolotes these dependencies from the global Pythonn installation which helps avoid conflicts with other projects.
#### 2. Reproducibility
- Using a virtual environment ensures that anyone working on the project has access to the exact versions of libraries and tools required.
- It is important for collaboration and deployment, ensuring that the application behaves the same across different systems. 
#### 3. Avoiding Conflicts
- If multiple projects require different versions of the same library, a virtual environment prevents version clashes by maintaining separate library sets for each project.
#### 4. Ease of Deployment
- When deploying the project, the environment having all the required dependencies simplifies the process. 
- A requirements.txt file generated from the environment allows seamless installation of all necessary packages. 
#### 5. Experimenting and testing
- A dedicated environment lets you experiment with new libraries or make changes without affcting other projects or the global Python installation. 

### Installation of required dependencies
- python -m venv env: create the virtual environment
- source env/Scripts/activate: activate the virtual environment
