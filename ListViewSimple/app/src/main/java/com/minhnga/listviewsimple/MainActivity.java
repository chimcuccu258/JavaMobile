package com.minhnga.listviewsimple;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    ListView listView;
    ArrayList<String> arrayList = new ArrayList<>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        getWidget();

        arrayList.add("Jane Austen");
        arrayList.add("Charles Dickens");
        arrayList.add("Mark Twain");
        arrayList.add("Emily Brontë");
        arrayList.add("George Orwell");
        arrayList.add("J.K. Rowling");
        arrayList.add("Ernest Hemingway");
        arrayList.add("Agatha Christie");
        arrayList.add("F. Scott Fitzgerald");
        arrayList.add("Leo Tolstoy");
        arrayList.add("Virginia Woolf");
        arrayList.add("Gabriel Garcia Marquez");
        arrayList.add("Harper Lee");
        arrayList.add("J.R.R. Tolkien");
        arrayList.add("Ayn Rand");
        arrayList.add("Ray Bradbury");
        arrayList.add("Herman Melville");
        arrayList.add("George R.R. Martin");
        arrayList.add("Roald Dahl");
        arrayList.add("Isaac Asimov");


        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, arrayList);
        listView.setAdapter(adapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int position, long id) {
                String mucChon = adapter.getItem(position);
                String chuoiThongBao = "You selected " + mucChon;
                Toast.makeText(MainActivity.this,chuoiThongBao,Toast.LENGTH_SHORT).show();
            }
        });
    }
    public void getWidget() {
        listView = findViewById(R.id.list_item);
    }
}