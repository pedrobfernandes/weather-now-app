export default function MockWeatherUi()
{
    return(
        <div className="city-forecast-wrapper" aria-hidden="true">
            <div className="grid-left-top">
                <article>
                    <h2 className="visually-hidden">Current city forecast</h2>
                </article>
                <section>
                    <dl className="current-weather-description-container">
                        <div className="unit-description-container">
                            <dt></dt>
                            <dd></dd>
                        </div>
                        <div className="unit-description-container">
                            <dt></dt>
                            <dd></dd>
                        </div>
                        <div className="unit-description-container">
                            <dt></dt>
                            <dd></dd>
                        </div>
                        <div className="unit-description-container">
                            <dt></dt>
                            <dd></dd>
                        </div>
                    </dl>
                </section>
                <section>
                    <h3>Daily Forecast</h3>
                    
                    <ul className="daily-forecast-container">
                        <li className="day-forecast-container">
                            <div className="day-temperatures-container">
                            </div>
                        </li>
                        <li className="day-forecast-container">
                            <div className="day-temperatures-container">
                            </div>
                        </li>
                        <li className="day-forecast-container">
                            <div className="day-temperatures-container">
                            </div>
                        </li>
                        <li className="day-forecast-container">
                            <div className="day-temperatures-container">
                            </div>
                        </li>
                        <li className="day-forecast-container">
                            <div className="day-temperatures-container">
                            </div>
                        </li>
                        <li className="day-forecast-container">
                            <div className="day-temperatures-container">
                            </div>
                        </li>
                        <li className="day-forecast-container">
                            <div className="day-temperatures-container">
                            </div>
                        </li>
                    </ul>
            
                </section>
            </div>
            <div className="grid-right-bottom">
            
                <section>
                    <div className="hourly-forecast-section-container">
                        <div className="hourly-forecast-header-container">
                             <h3>Hourly forecast</h3>
                        </div>
                        <ul className="hourly-forecast-container">
                            <li className="hour-forecast-card">
                            </li>
                            <li className="hour-forecast-card">
                            </li>
                            <li className="hour-forecast-card">
                            </li>
                            <li className="hour-forecast-card">
                            </li>
                            <li className="hour-forecast-card">
                            </li>
                            <li className="hour-forecast-card">
                            </li>
                            <li className="hour-forecast-card">
                            </li>
                            <li className="hour-forecast-card">
                            </li>
                        </ul>
                    </div>
                </section>
                
            </div>
        </div>
    );
}
