package vn.devminhnga.globeexplorer;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.util.List;

import vn.devminhnga.globeexplorer.Model.Country;

public class CountryAdapter extends BaseAdapter {
    List<Country> lstdataSource;
    private LayoutInflater inflater;
    private Context context;

    public CountryAdapter(List<Country> lstdataSource, Context context) {
        this.lstdataSource = lstdataSource;
        this.context = context;
        this.inflater = LayoutInflater.from(context);
    }

    class countryViewHolder {
        TextView countryNameView;
    }

    @Override
    public int getCount() {
        return lstdataSource.size();
    }

    @Override
    public Object getItem(int i) {
        return lstdataSource.get(i);
    }

    @Override
    public long getItemId(int i) {
        return 0;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        countryViewHolder itemViewHolder;
        if (view == null) {
            view = inflater.inflate(R.layout.country_list_view_item, null);
            itemViewHolder = new countryViewHolder();

            itemViewHolder.countryNameView = view.findViewById(R.id.textViewCountryName);

            view.setTag(itemViewHolder);
        } else {
            itemViewHolder = (countryViewHolder) view.getTag();
        }

        Country countryItem = lstdataSource.get(i);
        itemViewHolder.countryNameView.setText(countryItem.getCountryName());

        return view;
    }
}
