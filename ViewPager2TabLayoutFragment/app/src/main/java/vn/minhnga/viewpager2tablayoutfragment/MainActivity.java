package vn.minhnga.viewpager2tablayoutfragment;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager2.widget.ViewPager2;

import android.os.Bundle;

import com.google.android.material.tabs.TabLayout;
import com.google.android.material.tabs.TabLayoutMediator;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    CountryRVAdapter countryRVAdapter;
    ArrayList<Country> dsQG;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        dsQG = new ArrayList<Country>();
        Country qg1 = new Country("Vietnam","vn",80);
        Country qg2 = new Country("United State","us",68);
        Country qg3 = new Country("Russia","ru",120);
        dsQG.add(qg1);
        dsQG.add(qg2);
        dsQG.add(qg3);

        ViewPager2 viewPager2 = findViewById(R.id.viewPagerCountry);

        CountryPageAdapter countryPageAdapter  = new CountryPageAdapter(this, dsQG);
        viewPager2.setAdapter(countryPageAdapter);

        TabLayout tabLayout = findViewById(R.id.tabLayout);

        new TabLayoutMediator(tabLayout,viewPager2, (tab, position) -> tab.setText("Tab " + (position + 1))
        ).attach();

    }
}