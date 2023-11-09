package vn.devminhnga.globeexplorer;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;

import androidx.fragment.app.Fragment;

import java.util.ArrayList;

import vn.devminhnga.globeexplorer.Model.Country;

public class HomeFragment extends Fragment {
    private ArrayList<Country> dsQG;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home, container, false);

        dsQG = new ArrayList<Country>();
        Country qg1 = new Country("Vietnam");
        Country qg2 = new Country("United States");
        Country qg3 = new Country("Russia");
        dsQG.add(qg1);
        dsQG.add(qg2);
        dsQG.add(qg3);

        ListView lvQG = view.findViewById(R.id.listView);
        CountryAdapter adapter = new CountryAdapter(dsQG, getActivity());
        lvQG.setAdapter(adapter);

        return view;
    }
}

