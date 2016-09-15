package model;

import javafx.beans.property.ObjectProperty;
import javafx.beans.property.SimpleObjectProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

/**
 * Created by robertwaters on 8/12/16.
 *
 * Represents a single Course which may have many students assigned
 *
 * Information Holder and Structurer (manages the students assigned to the course
 */
public class Course {
    /** the course name */
    private final StringProperty _name = new SimpleStringProperty();

    /** the course number */
    private final StringProperty _number = new SimpleStringProperty();

    /** the school code for the course */
    private final ObjectProperty<SchoolCode> _school = new SimpleObjectProperty<>();

    /** the list of all registered students for this course */
    private final ObservableList<Student> _students = FXCollections.observableArrayList();

    /**
     * Makes a new Course
     * @param name  the name of the course like "Calc 2"
     * @param number the number of the course
     * @param school the code for the school like CS
     */
    public Course(String name, String number, SchoolCode school) {
        _name.set(name);
        _number.set(number);
        _school.set(school);
    }

    /* *****************************************
     * All the property setters and getters
     * */
    public String getName() { return _name.get(); }
    public void setName(String name) { _name.set(name); }
    public StringProperty getNameProperty() { return _name; }

    public String getNumber() { return _number.get(); }
    public void setNumber(String number) { _number.set(number); }
    public StringProperty getNumberProperty() { return _number; }

    public SchoolCode getSchool() { return _school.get(); }
    public void setSchool(SchoolCode school) {  _school.set(school); }
    public ObjectProperty getSchoolProperty() { return _school; }

    public ObservableList<Student> getStudents() {return _students; }

    /* ********************************************
     * Instance Methods
     */

    /**
     * Adds the requested student.  If student is already in the class, return false
     * This is an O(n) search
     *
     * This assumes all student names are unique
     *
     * @param student   the student to add to the course
     * @return true if success, false if student already in the class
     */
    public boolean addStudent(Student student) {

        //go through each student looking for duplicate name   O(n)
        for (Student s : _students) {
            if (s.getName().equals(student.getName())) {
                //oops found duplicate name, don't add and return failure signal
                return false;
            }
        }
        //never found the name so safe to add it.
        _students.add(student);
        //return the success signal
        return true;

    }



}
