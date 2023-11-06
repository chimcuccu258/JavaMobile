package vn.devminhnga.globeexplorer.Model;

import com.google.gson.annotations.SerializedName;

public class Country {
        @SerializedName("countryName")
    private String countryName;

    public Country(String countryName) {
        this.countryName = countryName;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }
}
