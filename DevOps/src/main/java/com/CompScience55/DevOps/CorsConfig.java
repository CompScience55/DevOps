package com.CompScience55.DevOps;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")                         // Für alle Endpunkte
                .allowedOrigins("http://localhost:4200")    // Erlaube Anfragen von deinem Angular-Frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Erlaube diese HTTP-Methoden
                .allowedHeaders("*")                       // Erlaube alle Header
                .allowCredentials(true)                    // Ermöglicht die Übertragung von Cookies und Auth-Daten
                .maxAge(3600);                             // Preflight-Anfragen werden für 3600 Sekunden gecached
    }
}
