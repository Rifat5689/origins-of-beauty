function Add-ReturnToFile {
    param([string]$Path)
    
    $absPath = (Resolve-Path $Path).Path
    $content = [System.IO.File]::ReadAllText($absPath)
    
    # Define replacements as pairs of old -> new
    $replacements = @(
        # Product controller
        @{Old = "res.status(200).`r`n      json(new ApiResponse (200 , product , `"product created successfully`"))"; New = "return res.status(200).`r`n      json(new ApiResponse (200 , product , `"product created successfully`"))"},
        @{Old = "res.status(200).json(`r`n        new ApiResponse(200 , products , `"product sent successfully`")`r`n`r`n     )"; New = "return res.status(200).json(`r`n        new ApiResponse(200 , products , `"product sent successfully`")`r`n`r`n     )"},
        @{Old = "res.status(200).`r`n    json(new ApiResponse(200, product , `"product sent successfully`"))"; New = "return res.status(200).`r`n    json(new ApiResponse(200, product , `"product sent successfully`"))"},
        @{Old = "res.status(200).`r`n    json(new ApiResponse(200, product , `"product sent successfully`"))`r`n`r`n}`), 
    )
    
    $count = 0
    foreach ($item in $replacements) {
        if ($content.Contains($item.Old)) {
            $content = $content.Replace($item.Old, $item.New)
            $count++
        }
    }
    
    [System.IO.File]::WriteAllText($absPath, $content, [System.Text.UTF8Encoding]::new($false))
    Write-Host "Replaced $count occurrences in $Path"
}

Add-ReturnToFile -Path "server/src/modules/product/product.controller.js"
