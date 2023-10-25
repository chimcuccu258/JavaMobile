package vn.vuminhnga.a63130803_thigiuaky;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.Toast;

import java.util.ArrayList;

public class activityCau2 extends AppCompatActivity {

    ArrayList<String> lstNNLT = new ArrayList<String>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cau2);

        getWidget();
        lstNNLT.add("C++");
        lstNNLT.add("Java");
        lstNNLT.add("Ruby");
        lstNNLT.add("Python");
        lstNNLT.add("Android Kotlin");
        ArrayAdapter<String> adapterNNLT = new ArrayAdapter<String>(this, android.R.layout.simple_dropdown_item_1line, lstNNLT);

        auLV.setAdapter(adapterNNLT);

        auLV.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                String mucChon = lstNNLT.get(i).toString();
                String chuoiThongBao = "Select one" + mucChon;
                Toast.makeText(activityCau2.this, chuoiThongBao, Toast.LENGTH_SHORT ).show();
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
    public void getWidget() {
        auLV = findViewById(R.id.lv);
    }
    ListView auLV;
}