package vn.devminhnga.globeexplorer.Api;

import com.google.gson.annotations.SerializedName;

import java.util.List;

import vn.devminhnga.globeexplorer.Model.Country;

public class CountryResponse {
    @SerializedName("data")
    private List<Country> data;

    public List<Country> getData() {
        return data;
    }
}
