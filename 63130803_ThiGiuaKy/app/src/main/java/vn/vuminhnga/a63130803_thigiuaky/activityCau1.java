package vn.vuminhnga.a63130803_thigiuaky;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class activityCau1 extends AppCompatActivity {
    private EditText editNumberA, editNumberB;
    private Button btnResult, btnBack;
    private TextView showResult;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cau1);

        editNumberA = findViewById(R.id.editNumberA);
        editNumberB = findViewById(R.id.editNumberB);

        btnResult = findViewById(R.id.btnResult);
        btnResult.setOnClickListener(tinhTong);

        showResult = findViewById(R.id.showResult);

        btnBack = findViewById(R.id.btnBack);
        btnBack.setOnClickListener(returnMain);
    }
    View.OnClickListener tinhTong = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            String strNumberA = editNumberA.getText().toString();
            String strNumberB = editNumberB.getText().toString();

            if (!strNumberA.isEmpty() && !strNumberB.isEmpty()) {
                double numberA = Double.parseDouble(strNumberA);
                double numberB = Double.parseDouble(strNumberB);

                double result = numberA + numberB;

                showResult.setText(String.valueOf(result));
            } else {
                showResult.setText("Nhập số vào");
            }
        }
    };
    View.OnClickListener returnMain = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Intent intentMain = new Intent(activityCau1.this, MainActivity.class);
            startActivity(intentMain);
        }
    };
}