package dev.minhngane.intentexercise;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

public class NhapLieuActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_nhap_lieu);
        // Set the custom toolbar as the support action bar
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        // Set the title in the action bar
        getSupportActionBar().setTitle("DataExchangeIntent");
    }
    public void Nhap_QuayVe(View v) {
        EditText txtName = (EditText)findViewById(R.id.editTen);
        EditText txtAge = (EditText)findViewById(R.id.editTuoi);

        String strName = txtName.getText().toString();
        int strAge = Integer.parseInt(txtAge.getText().toString());

        Intent iKetQuaNhapLieu = new Intent();

        iKetQuaNhapLieu.putExtra("name", strName);
        iKetQuaNhapLieu.putExtra("age", strAge);

        setResult(RESULT_OK, iKetQuaNhapLieu);
        finish();
    }
}