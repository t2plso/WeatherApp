import React, { useState } from "react";
import { View, Text, Button, Image, TextInput, StyleSheet } from "react-native"; 
import RNPickerSelect from "react-native-picker-select";

const API_KEY = "YOUR_API_KEY_HERE";

const WeatherApp = () => {
  const [city, setCity] = useState("Helsinki");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},FI&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod !== 200) {
        setError("Error: City not found");
        setWeather(null);
      } else {
        setWeather(data);
        setError(null);
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather in Finland</Text>
      
    
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
        placeholderTextColor="#aaa" 
      />

      <Button title="Get Weather" onPress={fetchWeather} />

      {error && <Text style={styles.error}>{error}</Text>}
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>{weather.name}, Finland</Text>
          <Text style={styles.temp}>{weather.main.temp}°C</Text>
          <Text style={styles.description}>{weather.weather[0].description}</Text>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
            }}
            style={styles.icon}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20, 
    backgroundColor: "black" 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "white" 
  },
  error: { 
    color: "red" 
  },
  weatherContainer: { 
    alignItems: "center", 
    marginTop: 20 
  },
  city: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "white" 
  },
  temp: { 
    fontSize: 30, 
    color: "white" 
  },
  description: { 
    color: "white" 
  },
  icon: { 
    width: 100, 
    height: 100 
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 20,
    width: "80%",
    paddingLeft: 10,
    fontSize: 16,
    color: "white", 
    backgroundColor: "#333",
    borderRadius: 5,
  },
});

export default WeatherApp;
