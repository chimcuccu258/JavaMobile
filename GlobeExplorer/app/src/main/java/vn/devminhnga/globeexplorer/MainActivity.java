package vn.devminhnga.globeexplorer;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.os.Bundle;
import android.view.MenuItem;

import com.google.android.material.bottomnavigation.BottomNavigationView;

public class MainActivity extends AppCompatActivity {
    private BottomNavigationView bottomNavigationView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        bottomNavigationView = findViewById(R.id.bottom_navigation);
        bottomNavigationView.setOnNavigationItemSelectedListener(item -> {
            if (item.getItemId() == R.id.menu_home) {
                replaceFragment(new HomeFragment());
                return true;
            } else if (item.getItemId() == R.id.menu_dashboard) {
                replaceFragment(new DashboardFragment());
                return true;
            } else if (item.getItemId() == R.id.menu_notifications) {
                replaceFragment(new NotificationsFragment());
                return true;
            } else if (item.getItemId() == R.id.menu_other) {
                replaceFragment(new OtherFragment());
                return true;
            }
            return false;
        });

        // Set the default fragment
        replaceFragment(new HomeFragment());
    }
    private void replaceFragment(Fragment fragment) {
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction transaction = fragmentManager.beginTransaction();
        transaction.replace(R.id.fragment_container, fragment);
        transaction.addToBackStack(null);
        transaction.commit();
    }
}