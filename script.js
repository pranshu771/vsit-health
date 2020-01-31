// Our labels along the x-axis
var scores = [100,100,100,100,100,100,100];
// For drawing the lines
var healScore = [0,0,0,0,0,0,0];

 var bmi = 17;
 var age =24;
 var sex = 1;
 var waist = 21;
 var cholesterol = 193;
 var smoke = 3;
 var drink = 2;
 var BP_upper = 139;
 var BP_lower = 85;
 var sleep = 10;
 var score_bmi;
 var score_waist;
 var score_cholestrol;
 var score_smoke;
 var score_drink;
 var score_BP;
 var score_sleep;


if(bmi>=18.5&&bmi<=24.9){
    score_bmi = 95;
}else if(bmi<18.5){
    score_bmi = (20*bmi) - 300;
    if(score_bmi<0){
        score_bmi = 0;
    }
}else if(bmi>24.9&&bmi<30){
    score_bmi = 239.4 - (6 * bmi);
}else if(bmi>29.9){
    score_bmi = 510 - (15*bmi);
    if(score_bmi<0){
        score_bmi = 0;
    } 
}

if(sex = 1){
    if(waist>=29&&waist<=35){
        score_waist = 95;
    }if(waist>35){
        score_waist = - (5.71*waist) + 285.71;
        if(score_waist<0){
            score_waist = 0;
        }
    }if(waist<29){
        score_waist = (8.89*waist) - 177.78;
        if(score_waist<0){
            score_waist = 0;
        }
    }

}

if(sex = 0){
    if(waist>=24&&waist<=28){
        score_waist = 95;
    }if(waist>28){
        score_waist = - (6.667*waist) + 266.66;
        if(score_waist<0){
            score_waist = 0;
        }
    }if(waist<29){
        score_waist = (10*waist) - 160;
        if(score_waist<0){
            score_waist = 0;
        }
    }

}

if(age>18){
    if(cholesterol<200){
        score_cholestrol = 95;
    }else if(cholesterol >200&&cholesterol<250){
        score_cholestrol = - (0.5*cholesterol) + 190;
    }else if(cholesterol>=250){
        score_cholestrol = -((5/4)*cholesterol) + (745/2);
        if(score_cholestrol<0){
            score_cholestrol=0;
        }
    }
}else if(age<=18){
    if(cholesterol<170){
        score_cholestrol = 95;
    }else if(cholesterol >170&&cholesterol<199){
        score_cholestrol = - (0.5*cholesterol) + 160;
    }else if(cholesterol>=200){
        score_cholestrol = -(cholesterol) + 260;
        if(score_cholestrol<0){
            score_cholestrol=0;
        }
    }
}

if(smoke == 0){
    score_smoke = 100;
}else if(smoke == 1){
    score_smoke = 80;
}else if(smoke == 2){
    score_smoke= 60;
}else if(smoke == 3){
    score_smoke = 40;
}else if(smoke == 4){
    score_smoke =10;
}

if(drink == 0){
    score_drink = 90;
}else if(smoke == 1){
    score_drink = 70;
}else if(drink == 2){
    score_drink= 40;
}

if((BP_upper>=90&&BP_upper<120)&&(BP_lower>60&&BP_lower<80)){
    score_BP = 90;
}else if((BP_upper>=120&&BP_upper<=129)&&BP_lower<80){
    score_BP = 80;
}else if((BP_upper>=130&&BP_upper<=139)&&(BP_lower>=80&&BP_lower<=89)){
    score_BP = 70;
}else if(BP_upper<90&&BP_lower<60){
    score_BP = 40;
}else if(BP_upper>=140&&BP_lower>=90){
    score_BP = 40;
}

if(sleep>=7&&sleep<=9){
    score_sleep = 95;
}else if(sleep<7){
    score_sleep = ((75/4)*sleep) - (145/4);
    if(score_sleep<0){
        score_sleep =0;
    }
}else if(sleep>9){
    score_sleep = -((85/6)*sleep) + (445/2);
    if(score_sleep < 0){
        score_sleep = 0;
    }
}

console.log(score_bmi);
console.log(score_waist);
console.log(score_cholestrol);
console.log(score_smoke);
console.log(score_drink);
console.log(score_BP);
console.log(score_sleep);

healScore[0] = score_bmi;
healScore[1] = score_waist;
healScore[2] = score_cholestrol;
healScore[3] = score_smoke;
healScore[4] = score_drink;
healScore[5] = score_BP;
healScore[6] = score_sleep;



var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: 'polarArea',

  data: {
    labels: [
        'BMI',
        'Waist',
        'Cholesterol',
        'Smoking',
        'Drinking',
        'BP',
        'Sleep'
    ],
    label: 'My Health Score',
    datasets: [
        { 
            data: healScore,
            label: "Health Score",
            backgroundColor: [
            "#BF6384",
            "#4BC0C0",
            "#A9CEF6",
            "#E7E9ED",
            "#36A2EB",
            "#36ALWB",
            "#F6126B"
        ],
          },
          
    ]


  },

});
