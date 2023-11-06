package vn.devminhnga.globeexplorer;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;

import androidx.fragment.app.Fragment;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import vn.devminhnga.globeexplorer.Api.CountryResponse;
import vn.devminhnga.globeexplorer.Api.CountryService;
import vn.devminhnga.globeexplorer.Model.Country;

public class HomeFragment extends Fragment {
    private ListView listView;
    private CountryAdapter countryAdapter;
    private List<Country> countryList;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home, container, false);

        listView = view.findViewById(R.id.listView);
        countryList = new ArrayList<>();
        countryAdapter = new CountryAdapter(countryList, getContext());
        listView.setAdapter(countryAdapter);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(CountryService.BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        CountryService apiService = retrofit.create(CountryService.class);

        Call<CountryResponse> call = apiService.getAllCountries(CountryService.API_KEY);

        call.enqueue(new Callback<CountryResponse>() {
            @Override
            public void onResponse(Call<CountryResponse> call, Response<CountryResponse> response) {
                if (response.isSuccessful()) {
                    if (response.body() != null) {
                        CountryResponse countryResponse = response.body();
                        List<Country> countries = countryResponse.getData();

                        if (countries != null) {
                            countryList.addAll(countries);
                            countryAdapter.notifyDataSetChanged();
                        } else {
                            Log.e("API Response", "List is null");
                            Log.d("Raw Response", response.raw().toString());
                        }
                    } else {
                        Log.e("API Response", "Response body is null");
                    }
                } else {
                    try {
                        Log.e("Error", response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }

            @Override
            public void onFailure(Call<CountryResponse> call, Throwable t) {
                Log.e("Error", t.getMessage());
            }
        });
//        Log.d("HelloWorld", "Hello World!");

        return view;
    }
}
