package com.trueconf;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

public class DialogActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(getApplicationContext().getResources().getIdentifier("activity_dialog", "layout", getApplicationContext().getPackageName()));
        ((TextView)findViewById(getApplicationContext().getResources().getIdentifier("alertText", "id", getApplicationContext().getPackageName()))).setText(getIntent().getStringExtra("ALERT_TEXT"));
    }

}

