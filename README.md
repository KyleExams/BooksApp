# BooksApp
<b>Angular, Web API, Entity Framework &amp; SQL Server</b>

This is just a sample application for demonstration purposes or a starting point on how to implement the technologies stated below.

Technologies (excluding dependencies):
<ol>
	<li>ASP.NET Web Api 2 (.NET Framework 4.7.2)</li>
  <li>Entity Framework 6.2</li>
  <li>SQL Server (SQL Database Project)</li>
	<li>Angular6</li>
	<li>ngx-pagination</li>
	<li>ngx-toastr</li>
	<li>bootstrap css</li>
</ol>

How to use:
<ol>	
  <li>Install node.js on machine (if not already installed)</li>
	<li>Using command prompt, install angular global in npm</li>
	<li>Change directory to the BooksApp folder of the project with the package.json file</li>
  <li>Run 'npm install' (<i>The version of Angular as of the time of this app's development is 6.1.0, if any issues are encountered delete node_modules folder and try again</i>)</li>  
  <li>Open solution in Visual Studio 2017</li>
	<li>Right click the BooksDB SQL Database Project and click Publish</li>
  <li>Follow instructions and make sure SQL Server instance is running (<i>Make sure name of database to be created is BooksDB, and in Advanced Publish Settings, check Always re-create database option</i>)</li>
  <li>Once done, there should be a new database BooksDB with a Books table in it in the SQL Server instance</li>
  <li>Build solution</li>  
	<li>Back to command prompt, still in BooksApp directory, run 'ng serve' and just leave this window running</li>
	<li>Back to Visual Studio 2017, run the application</li>
	<li>It will open up the browser and will display an error message (<i>As it is pointed to the Web Api port by default</i>)</li>
  <li>Change the URL to <i>http://localhost:4200</i> to access the Angular application</li>
</ol>
