package vn.devminhnga.globeexplorer;/*
 * @created 09/11/2023 15:46
 * @author MinhNga
 */

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import androidx.annotation.Nullable;

public class DBHelper extends SQLiteOpenHelper {

    public DBHelper(@Nullable Context context, @Nullable String name, @Nullable SQLiteDatabase.CursorFactory factory, int version) {
        super(context, "geodata.db", factory, version);
    }

    @Override
    public void onCreate(SQLiteDatabase DB) {
        DB.execSQL("CREATE TABLE IF NOT EXISTS countries (" +
                "name TEXT NOT NULL," +
                "abv TEXT NOT NULL," +
                "abv3 TEXT," +
                "abv3_alt TEXT," +
                "code TEXT," +
                "slug TEXT NOT NULL," +
                "PRIMARY KEY (abv)," +
                "UNIQUE (slug)" +
                ")");
//        DB.execSQL("INSERT INTO Country (name) VALUES ('Vietnam')");
//        DB.execSQL("INSERT INTO Country (name) VALUES ('United States')");
//        DB.execSQL("INSERT INTO Country (name) VALUES ('Russia')");
        DB.execSQL("INSERT INTO countries (name, abv, abv3, abv3_alt, code, slug) VALUES " +
                "('Afghanistan', 'AF', 'AFG', NULL, 4, 'afghanistan')," +
                "('Aland Islands', 'AX', 'ALA', NULL, 248, 'aland-islands')," +
                "('Albania', 'AL', 'ALB', NULL, 8, 'albania')," +
                "('Algeria', 'DZ', 'DZA', NULL, 12, 'algeria')," +
                "('American Samoa', 'AS', 'ASM', NULL, 16, 'american-samoa')," +
                "('Andorra', 'AD', 'AND', NULL, 20, 'andorra')," +
                "('Angola', 'AO', 'AGO', NULL, 24, 'angola')," +
                "('Anguilla', 'AI', 'AIA', NULL, 660, 'anguilla')," +
                "('Antigua and Barbuda', 'AG', 'ATG', NULL, 28, 'antigua-and-barbuda')," +
                "('Argentina', 'AR', 'ARG', NULL, 32, 'argentina')," +
                "('Armenia', 'AM', 'ARM', NULL, 51, 'armenia')," +
                "('Aruba', 'AW', 'ABW', NULL, 533, 'aruba')," +
                "('Australia', 'AU', 'AUS', NULL, 36, 'australia')," +
                "('Austria', 'AT', 'AUT', NULL, 40, 'austria')," +
                "('Azerbaijan', 'AZ', 'AZE', NULL, 31, 'azerbaijan')");
    }

    @Override
    public void onUpgrade(SQLiteDatabase DB, int i, int i1) {
        DB.execSQL("DROP TABLE IF EXISTS countries");
    }
    public Cursor getData() {
        SQLiteDatabase DB = this.getWritableDatabase();
        Cursor cursor = DB.rawQuery("SELECT * FROM countries", null);
        return cursor;
    }
}