package model;

/**
 * Created by eugenechu on 9/13/16.
 */
public enum ClassStanding {
   FRESHMAN("FR"),
    SOPHOMORE("SO"),
    JUNIOR("JR"),
    SENIOR("SR");

    private final String cs;
    ClassStanding(String cs) {
        this.cs = cs;
    }
}

