package com.shipsummarry.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletResponse;

@CrossOrigin
@Controller
public class MainController {

    @GetMapping(value = "/")
    public String getInitialPage() {
        return "index.html";
    }

    @GetMapping(value = {"/ui/**"})
    public void redirectToInitialPage(HttpServletResponse httpServletResponse) {
        httpServletResponse.setHeader("Location", "/");
        httpServletResponse.setStatus(302);
    }

}
