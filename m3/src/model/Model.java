package model;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

/**
 * This class serves as a Facade into the application model
 * Right now it is a Singleton so the controllers can get access easily.
 *
 * Created by robertwaters on 8/30/16.
 */
public class Model {

    /** Set Model up as a singleton design pattern */
    private static final Model instance = new Model();
    public static Model getInstance() { return instance; }


    /** a list of all the courses in the university */
    private final ObservableList<Course> courses = FXCollections.observableArrayList();

    /** Null Object pattern, returned when no course is found */
    private final Course theNullCourse = new Course("No Such Course", "9999", SchoolCode.XX);

    /** Remember the currently selected course */
    private Course currentCourse;

    /**
     * Make a new Model
     * Fill it with some canned classes and students for data.
     */
    private Model () {
        courses.add(new Course("Objects and Design", "2340", SchoolCode.CS));
        courses.add(new Course( "TQM", "4321", SchoolCode.IE));
        courses.add(new Course("Concrete Ideas", "5432", SchoolCode.AR));
        courses.add(new Course("Calc I", "2213", SchoolCode.MATH));
        courses.get(0).getStudents().add(new Student("Bob", "CS"));
        courses.get(0).getStudents().add(new Student("Sally", "ISYE"));
        courses.get(1).getStudents().add(new Student("Fred", "Math"));
        courses.get(1).getStudents().add(new Student("Edith", "CM"));
        currentCourse = courses.get(0);
    }

    /**
     *
     * @return  the currently selected course
     */
    public Course getCurrentCourse() { return currentCourse;}

    public void setCurrentCourse(Course course) { currentCourse = course; }

    /**
     * Return a course that has matching number.
     * This uses an O(n) linear search.
     *
     * @param number the number of the course to find
     * @return  the course with that number or the NullCourse if no such number exists.
     *
     */
    public Course getCourseByNumber (String number) {
        for (Course c : courses ) {
            if (c.getNumber().equals(number)) return c;
        }
        return theNullCourse;
    }

    /**
     *
     * @return  a list of all the courses.  mostly used by UI to display in the table view
     */
    public ObservableList<Course> getCourses() { return courses; }


    /**
     * add a student to the current course
     *
     * @param student the student to add
     * @return true if student added, false if not added
     */
    public boolean addStudent(Student student) {
        return currentCourse != null && currentCourse.addStudent(student);
    }
}
