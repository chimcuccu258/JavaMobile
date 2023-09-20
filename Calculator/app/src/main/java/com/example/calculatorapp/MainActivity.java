package com.example.calculatorapp;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import androidx.core.content.ContextCompat;

import com.google.android.material.textfield.TextInputEditText;

import java.util.Objects;

public class MainActivity extends AppCompatActivity {
    private TextInputEditText weight;
    private TextInputEditText height;
    private TextView result;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        weight = findViewById(R.id.weightEditText);
        height = findViewById(R.id.heightEditText);
        result = findViewById(R.id.resultTextView);

        Button calculateBtn = findViewById(R.id.calculateButton);
        calculateBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                calculateBMI();
            }
        });
    }

    private void calculateBMI() {
        String weightText = Objects.requireNonNull(weight.getText()).toString();
        String heightText = Objects.requireNonNull(height.getText()).toString();

        if (!weightText.isEmpty() && !heightText.isEmpty()) {
            double weight = Double.parseDouble(weightText);
            double height = Double.parseDouble(heightText) / 100.0;

            double bmi = weight / (height * height);

            String bmiResult;
            if (bmi < 18.5) {
                bmiResult = getString(R.string.underweight);
            } else if (bmi < 24.9) {
                bmiResult = getString(R.string.normal_weight);
            } else if (bmi < 29.9) {
                bmiResult = getString(R.string.overweight);
            } else {
                bmiResult = getString(R.string.obese);
            }

            result.setTextColor(ContextCompat.getColor(this, R.color.black));
            result.setText(getString(R.string.bmi_result, bmi) + "\n" + bmiResult);
        } else {
            result.setTextColor(ContextCompat.getColor(this, R.color.red));
            result.setText(R.string.empty_fields_error);
        }
    }
}