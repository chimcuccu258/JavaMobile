package dev.minhngane.intentexercise;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
    public void NhapLieu(View v) {
        Intent iNhap = new Intent(this, NhapLieuActivity.class);
        startActivityForResult(iNhap, 8000);
    }
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == 8000)
            if (resultCode == RESULT_OK) {
                String stTen = data.getStringExtra("name");
                int stTuoi = data.getIntExtra("age", 2020);

                TextView txtTen = (TextView)findViewById(R.id.ten);
                TextView txtTuoi = (TextView)findViewById(R.id.tuoi);

                txtTen.setText(stTen);
                txtTuoi.setText(String.valueOf(stTuoi));
            }
            else
                Toast.makeText(this, "Trả về thất bại", Toast.LENGTH_LONG);
        else
            super.onActivityResult(requestCode, resultCode, data);
    }
}