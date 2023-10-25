package vn.vuminhnga.a63130803_thigiuaky;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.Toast;

import java.util.ArrayList;

public class activityCau3 extends AppCompatActivity {

    ArrayList<Country> dsQG;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cau3);

        dsQG = new ArrayList<Country>();
        Country qg1 = new Country("Vietnam", "vn", 999999);
        Country qg2 = new Country("United States", "us", 999999);
        Country qg3 = new Country("Russia", "rus", 999999);
        dsQG.add(qg1);
        dsQG.add(qg2);
        dsQG.add(qg3);

        ListView lvQG = findViewById(R.id.list_item);

        CountryArrayAdapter adapter;
        adapter = new CountryArrayAdapter(dsQG,this);
        lvQG.setAdapter(adapter);

        lvQG.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Country country = dsQG.get(i);
                Toast.makeText(activityCau3.this, country.getCountryName(), Toast.LENGTH_SHORT).show();
            }
        });

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        ImageView ivBack = findViewById(R.id.ivBack);
        ivBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                onBackPressed();
            }
        });

        getSupportActionBar().setDisplayShowTitleEnabled(false);
    }
}