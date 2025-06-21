    package com.biz_lens.BizLens_Backend.Controller;

    import com.biz_lens.BizLens_Backend.Service.VisualizationService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.Map;

    @RestController
    @RequestMapping("/api/visualization")
    public class VisualizationController {

        @Autowired
        private VisualizationService visualizationService;

        @PostMapping
        public ResponseEntity<Map<String, Object>> getVisualizationData(@RequestBody Map<String, Object> insights) {
            try {
                Map<String, Object> visualizationData = visualizationService.prepareVisualizationData(insights);
                return ResponseEntity.ok(visualizationData);
            } catch (Exception e) {
                // Log the error (optional)
                e.printStackTrace();
                // Return a bad request response with error details
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Failed to prepare visualization data", "details", e.getMessage()));
            }
        }
    }
