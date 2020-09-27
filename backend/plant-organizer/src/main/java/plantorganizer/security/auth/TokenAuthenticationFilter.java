package plantorganizer.security.auth;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;
import plantorganizer.security.TokenUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class TokenAuthenticationFilter extends OncePerRequestFilter {

    private TokenUtils tokenUtils;

    private UserDetailsService userDetailsService;

    public TokenAuthenticationFilter(TokenUtils tokenHelper, UserDetailsService userDetailsService) {
        this.tokenUtils = tokenHelper;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {

        String username;
        String authToken = tokenUtils.getToken(httpServletRequest);

        if(authToken != null){
            username = tokenUtils.getUsernameFromToken(authToken);

            if(username != null){
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                if (tokenUtils.validateToken(authToken, userDetails)) {
                    TokenBasedAuthentication authentication = new TokenBasedAuthentication(userDetails);
                    authentication.setToken(authToken);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } else if(httpServletRequest.getQueryString() != null && httpServletRequest.getQueryString().contains("accessToken")){
            String authTokenVersion2 = httpServletRequest.getParameterMap().get("accessToken")[0];
            if(authTokenVersion2 != null){
                username = tokenUtils.getUsernameFromToken(authTokenVersion2);

                if(username != null){
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                    if (tokenUtils.validateToken(authTokenVersion2, userDetails)) {
                        // kreiraj autentifikaciju
                        TokenBasedAuthentication authentication = new TokenBasedAuthentication(userDetails);
                        authentication.setToken(authTokenVersion2);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            }
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
