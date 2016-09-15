package controller;

import fxapp.MainFXApplication;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import model.Course;
import model.Model;
import model.Student;

/**
 * Created by robertwaters on 8/30/16.
 *
 * Controller for the Course Overview Display
 */
public class CourseOverviewController {

    /** a link back to the main application class */
    private MainFXApplication mainApplication;

    /* references to the widgets in the fxml file */
    @FXML
    private ListView<Student> studentList;

    @FXML
    private TableView<Course> courseTable;

    @FXML
    private TableColumn<Course, String> courseNumberColumn;

    @FXML
    private TableColumn<Course, String> courseSchoolColumn;

    /**
     * Initializes the controller class. This method is automatically called
     * after the constructor and
     * after the fxml file has been loaded.
     */
    @FXML
    private void initialize() {
        // Initialize the course table with the two columns.
        courseNumberColumn.setCellValueFactory(cellData -> cellData.getValue().getNumberProperty());
        courseSchoolColumn.setCellValueFactory(cellData -> cellData.getValue().getSchoolProperty());

        // Listen for selection changes and show the course student list when changed.
        courseTable.getSelectionModel().selectedItemProperty().addListener(
                (observable, oldValue, newValue) -> showCourseDetails(newValue));
    }



    /**
     * Setup the main application link so we can call methods there
     *
     * @param mainFXApplication  a reference (link) to our main class
     */
    public void setMainApp(MainFXApplication mainFXApplication) {

        mainApplication = mainFXApplication;

        //set the table view to contain the list of courses from the model
        courseTable.setItems(Model.getInstance().getCourses());

        //automatically select the first table item and display the students
        courseTable.getSelectionModel().select(0);
        studentList.setItems(Model.getInstance().getCurrentCourse().getStudents());
    }

    /**
     * Called when the table selection changes
     * @param c the course that has been selected in the table
     */
    private void showCourseDetails(Course c) {

        studentList.setItems(c.getStudents());

        Model.getInstance().setCurrentCourse(c);
    }


    /**
     * Button handler for add course
     * Currently not implemented
     */
    @FXML
    public void addCoursePressed() {
        // Show the error message if bad data
        Alert alert = new Alert(Alert.AlertType.ERROR);
        alert.initOwner(mainApplication.getMainScreen());
        alert.setTitle("Unimplemented");
        alert.setHeaderText("Unimplemented Feature");
        alert.setContentText("Sorry, Adding Courses is not yet implemented!");

        alert.showAndWait();

    }

    /**
     * Button handler for add student
     */
    @FXML
    public void addStudentPressed() {

        Student tempStudent = new Student();
        boolean okClicked = mainApplication.showStudentAddDialog(tempStudent);
        if (okClicked) {
            if (!Model.getInstance().addStudent(tempStudent)) {
                //if the add fails, notify the user
                Alert alert = new Alert(Alert.AlertType.ERROR);
                alert.initOwner(mainApplication.getMainScreen());
                alert.setTitle("User Not Added");
                alert.setHeaderText("Bad User Add");
                alert.setContentText("User was not added, check that they are not already in class!");

                alert.showAndWait();
            }
        }

    }



}
