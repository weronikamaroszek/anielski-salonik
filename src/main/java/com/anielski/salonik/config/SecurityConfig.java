package com.anielski.salonik.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .authorizeHttpRequests(auth -> auth
            // H2 console - allowed for dev, TODO: remove before production
            .requestMatchers(org.springframework.boot.autoconfigure.security.servlet.PathRequest.toH2Console()).permitAll()
            // Admin panel - only for logged in users
            .requestMatchers("/admin/**").authenticated()
            // Everything else - public
            .anyRequest().permitAll()
        )
        .formLogin(form -> form
            .loginPage("/admin/login")
            .defaultSuccessUrl("/admin", true)
            .permitAll()
        )
        .logout(logout -> logout
            .logoutUrl("/admin/logout")
            .logoutSuccessUrl("/")
            .permitAll()
        )
        // H2 console needs CSRF disabled and frame options disabled (dev only!)
        .csrf(csrf -> csrf.ignoringRequestMatchers(org.springframework.boot.autoconfigure.security.servlet.PathRequest.toH2Console()))
        .headers(headers -> headers.frameOptions(frame -> frame.disable()));
    return http.build();
}

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        UserDetails admin = User.builder()
            .username("paulina")
            .password(encoder.encode("admin123"))
            .roles("ADMIN")
            .build();
        return new InMemoryUserDetailsManager(admin);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}