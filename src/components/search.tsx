import { useState } from "react";
import "../App.css"; // See the CSS styles below

interface WeatherData {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
}

function Search() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getWeather = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!city.trim()) return;

        setLoading(true);
        setError(null);

        // Note: For production, move this to a .env file (e.g., process.env.REACT_APP_API_KEY)
        const API_KEY = "3f4394ac7abde6a9f60602281d3c6af9"; 

        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "City not found");
            }

            setWeather(data);
        } catch (err: any) {
            setWeather(null);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="weather-container">
            <div className="weather-card">
                <h1 className="app-title">Weather App</h1>
                
                <form onSubmit={getWeather} className="search-form">
                    <input
                        type="search"
                        placeholder="Enter city name..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button" disabled={loading}>
                        {loading ? <span className="spinner"></span> : "🔍"}
                    </button>
                </form>

                {error && <div className="error-message">⚠️ {error}</div>}

                {weather && !loading && (
                    <div className="weather-info animate-fade-in">
                        <h2 className="city-name">{weather.name}</h2>
                        
                        <div className="temp-display">
                            {Math.round(weather.main.temp)}<span className="unit">°C</span>
                        </div>

                        <div className="weather-condition">
                            <img 
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                                alt={weather.weather[0].description} 
                                className="weather-icon"
                            />
                            <p className="description">{weather.weather[0].description}</p>
                        </div>

                        <div className="weather-details">
                            <div className="detail-item">
                                <span className="detail-label">Humidity</span>
                                <span className="detail-value">{weather.main.humidity}%</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;