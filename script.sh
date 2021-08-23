#!/bin/bash
for i in $(ls -l out/ | grep "html" | awk '{print $9}')
do
    IN=$i
    arrIN=(${IN//./ })
    if [ -d "out/$arrIN" ]
    then 
       mv "out/$i" "out/$arrIN/index.html"
    fi
    
done