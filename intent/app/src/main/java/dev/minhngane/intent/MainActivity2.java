package dev.minhngane.intent;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity2 extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);

        Button btn2 = findViewById(R.id.btn2);
        btn2.setOnClickListener(changeScreen);

        Intent receivedIntent = getIntent();
        String name = receivedIntent.getStringExtra("name");
        String age = receivedIntent.getStringExtra("age");

        TextView txtName = findViewById(R.id.name);
        TextView txtAge = findViewById(R.id.age);

        txtName.setText(name);
        txtAge.setText(age);
    }

    View.OnClickListener changeScreen = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Intent intent2 = new Intent(MainActivity2.this, MainActivity.class);
            startActivity(intent2);
        }
    };
}