package com.example.MakersHub.dto;

import lombok.Data;

@Data
public class LocationDTO {
    private String display_name;
    private String lat;
    private String lon;
    private String place_id;
    private String type;
    private String importance;
    // Add other fields as needed from Nominatim response

    public String getDisplay_name(){return display_name;}
    public void setDisplay_name(String display_name){this.display_name=display_name;}
    public String getLat(){return lat;}
    public void setLat(String lat){this.lat=lat;}
    public String getLon(){return lon;}
    public void setLon(String lon){this.lon=lon;}
    public String getPlace_id(){return place_id;}
    public void setPlace_id(String place_id){this.place_id=place_id;}
    public String getType(){return type;}
    public void setType(String type){this.type=type;}
    public String getImportance(){return importance;}
    public void setImportance(String importance){this.importance=importance;}

}