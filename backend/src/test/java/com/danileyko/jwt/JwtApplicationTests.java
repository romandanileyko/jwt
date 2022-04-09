package com.danileyko.jwt;

import com.danileyko.jwt.security.jwt.JwtProvider;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.Assert.assertNotNull;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class JwtApplicationTests {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Test
    public void contextLoads() {
    }
    @Test
    public void authTestForAdminRole() throws Exception {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken("jack", "123456789"));
        String token = jwtProvider.generateJwtToken(authentication);
        assertNotNull(token);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/test/admin")
                .header("Authorization", "Bearer "+token))
                .andExpect(status().isForbidden());
    }
    @Test
    public void authTestForAdminRoleFailed() throws Exception {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken("user1", "userpassword"));
        String token = jwtProvider.generateJwtToken(authentication);
        assertNotNull(token);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/test/admin")
                .header("Authorization", "Bearer "+token))
                .andExpect(status().isOk());
    }
    @Test
    public void authTestForPmRole() throws Exception {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken("thomas", "123456789"));
        String token = jwtProvider.generateJwtToken(authentication);
        assertNotNull(token);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/test/pm")
                .header("Authorization", "Bearer "+token))
                .andExpect(status().isOk());
    }
}
