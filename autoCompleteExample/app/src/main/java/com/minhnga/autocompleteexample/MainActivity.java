package com.minhnga.autocompleteexample;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    AutoCompleteTextView autoCompleteTextView;
    ArrayList<String> countries = new ArrayList<>();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        getWidget();
        countries.add("Viet Nam");
        countries.add("Venezuela");
        countries.add("England");
        countries.add("United State");
        countries.add("Poland");
        countries.add("France");

        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_dropdown_item_1line, countries);
        autoCompleteTextView.setAdapter(adapter);
        autoCompleteTextView.setThreshold(1);
    }
    void getWidget() {
        autoCompleteTextView = findViewById(R.id.autoComplete);
    }
}