package vn.vuminhnga.a63130803_thigiuaky;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
    public void ChuyenCau1(View v) {
        Intent intentCau1 = new Intent(MainActivity.this, activityCau1.class);
        startActivity(intentCau1);
    }
    public void ChuyenCau2(View v) {
        Intent intentCau2 = new Intent(MainActivity.this, activityCau2.class);
        startActivity(intentCau2);
    }
    public void ChuyenCau3(View v) {
        Intent intentCau3 = new Intent(MainActivity.this, activityCau3.class);
        startActivity(intentCau3);
    }

    public void ChuyenCau4(View v) {
        Intent intentCau4 = new Intent(MainActivity.this, activityCau4.class);
        startActivity(intentCau4);
    }
}