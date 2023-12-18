package vn.minhnga.testsqlite;

import androidx.appcompat.app.AppCompatActivity;

import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {
    SQLiteDatabase bookDB;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        bookDB = openOrCreateDatabase("book.db", MODE_PRIVATE, null);
        String sqlTaoBang = "CREATE TABLE IF NOT EXISTS book (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, price REAL)";
        bookDB.execSQL(sqlTaoBang);
    }
}