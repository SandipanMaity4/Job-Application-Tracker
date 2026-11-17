
package com.jobtracker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI jobTrackerOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Job Application Tracker API")
                        .description(
                                "REST APIs for managing job applications, " +
                                "searching jobs, tracking application status, " +
                                "and viewing dashboard statistics."
                        )
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Job Application Tracker")
                                .email("support@example.com")
                        )
                );
    }
}
