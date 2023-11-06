package vn.devminhnga.globeexplorer.Api;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface CountryService {
    String API_KEY = "FslhoXyshTfKvBh9aAnEDwMOfxjx32JIecO8OiiO";
    String BASE_URL = "https://countryapi.io/api/";

    @GET("all")
    Call<CountryResponse> getAllCountries(@Query("apikey") String apiKey);
}
