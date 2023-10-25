package vn.vuminhnga.a63130803_thigiuaky;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

public class activityCau4 extends AppCompatActivity {
    private Button btnBack4;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cau4);

        ImageView imageViewAvatar = findViewById(R.id.imageViewAvatar);
        imageViewAvatar.setImageResource(R.drawable.avatar);

        btnBack4 = findViewById(R.id.btnBack4);
        btnBack4.setOnClickListener(returnMain4);
    }
    View.OnClickListener returnMain4 = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Intent intentMain4 = new Intent(activityCau4.this, MainActivity.class);
            startActivity(intentMain4);
        }
    };
}