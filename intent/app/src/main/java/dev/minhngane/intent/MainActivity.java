package dev.minhngane.intent;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void navigate(View view) {
        Intent intent = new Intent(this, MainActivity2.class);

        EditText eName = findViewById(R.id.editName);
        EditText eAge = findViewById(R.id.editAge);

        String strName = eName.getText().toString();
        String strAge = eAge.getText().toString();

        intent.putExtra("name", strName);
        intent.putExtra("age", strAge);

        startActivity(intent);
    }
}