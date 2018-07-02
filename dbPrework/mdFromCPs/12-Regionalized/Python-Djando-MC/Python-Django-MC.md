## Python and Django - Multiple Choice Questions


### 1 

1. Declaring a variable - `Python` `var` `variable` `tech vocab`

    :question: In Python, how is a variable `my_var` declared?

    * `var my_var`
    * `def my_var`
    * `my_var` :white_check_mark:
    * `set my_var`


### 2 

2. Understanding default parameters - `Python` `parameters` `tech vocab` `syntax`

    :question: Running the following code will print :
    ```
    def sum(x, y = 2):
      return x + y

    print(sum(5))
    ```

    * 7 :white_check_mark:
    * 2
    * 5
    * undefined


### 3 

3. Establishing context in Class instantiation - `Python` `syntax` `Classes`

    :question: When creating a Class how do you establish context on instantiation?

    * Passing the `this` keyword in the __init__ method
    * Using the keyword self within the __init__ method
    * Binding of context is automatic upon instantiation
    * Passing self as the first argument to the __init__ method :white_check_mark:


### 4 

4. Regex metacharacter used to declare the end of the line - `Python` `Django` `Regex`

    :question: When defining urls in the `urlpatterns` what is the correct syntax to establish the start and end to a route?

    * r'$blog/|'
    * r'^blog/$' :white_check_mark:
    * r'.blog/^'
    * r'|blog/.'


### 5 

5. Importance of the runserver command in Django - `Python` `Django` `dev environment`

    :question: What does running the `python manage.py runserver` command allow us to do?

    * Deploy app
    * Spin up local development server :white_check_mark:
    * Create build for production
    * Update database with models


### 6 

6. Test the reason to use virtualenv when developing in Python - `Python` `dev environment`

    :question: When starting a Python project, starting with `virtualenv` allows you to?

    * Connect to a virtual machine
    * Create cloud environment for pair programming
    * Create workspace to install local packages :white_check_mark:
    * Allows package manager to install Python packages


### 7 

7. Understanding the possibility of argument lists in functions - `Python` `syntax` `parameters`

    :question: In the following snippet:
    ```
    def find_value(*args):
      # function code block here
    ```
    What is the purpose of the asterisk(*) before `args`?

    * args is a pointer variable
    * args is now a required argument
    * args is a dictionary of arguments
    * args is a list of arguments :white_check_mark:


### 8 

8. Testing the importance of using templates in Django - `Python` `Django` `templates` `MVC`

    :question: Using templates demonstrates what major benefit in a MVC architecture?

    * Having prebuilt forms for modularity
    * Decoupling of logic and template for easier maintenance :white_check_mark:
    * Allowing for faster rendering
    * Holding helper functions for code reusability


### 9 

9. Using models in an MVC architecture - `MVC` `models` `tech vocab`

    :question: The advantage of using models is that it ___.

    * Creates UI components for reusability
    * Allows for holding logic to which the view can react
    * Makes a formatted object to communicate data with the database :white_check_mark:
    * Provides prebuilt views for rendering to the DOM


### 10 

10. Importance of having capture groups for dynamic parameters - `Python` `Django` `syntax`

    :question: In the following URL `quiltyascharged.com/quilt/99`, which capture group would grab the quilt id for us?

    * `(?P<quilt_id>[0-9]+)` :white_check_mark:
    * `(?P<quilt_id>[0-9]++)`
    * `(?P'quilt_id'[0-9]+)`
    * `(?P'quilt_id'[0-9]++)`


### 11 

11. Understanding form validation - `validation` `security` `forms`

    :question: Proper form validation is accomplished by/with ___.
    
    * Client side logic
    * HTML5 attribute `required`
    * Input attributes *i.e. maxlength, min, max* 
    * Server side validation :white_check_mark:
