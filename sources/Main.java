package net.gddata.oadds2.index;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;

/**
 * Created by gddev3 on 16/5/26.
 */
@SpringBootApplication
@TestConfiguration
//@EnableDiscoveryClient
@EnableFeignClients
@EnableEurekaClient
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

}
