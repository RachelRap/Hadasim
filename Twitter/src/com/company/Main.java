package com.company;

import java.util.Scanner;

public class Main {

    public static void square(double height,double width){
        double calc;
        if(height==width||height-width>5){
            calc=width*height;
            System.out.println("the area of the square: "+calc);
        }
        else{
            calc=(width*2)+(height*2);
            System.out.println("the perimeter of the square: "+calc);
        }
    }

    public static void triangular(double height,double width){
        Scanner in = new Scanner(System.in);
        int choice;
        System.out.println("Enter 1 to Scope calculation\nEnter 2 to Triangle print");
        choice= in.nextInt();
        switch (choice){
            case 1:
                scopeCalculation(height,width);
                break;
            case 2:
                trianglePrint((int)height,(int)width);
                break;
        }
    }

    public static void scopeCalculation(double height,double width){
        double calc;
        calc=width+(2*height);
        System.out.println("The perimeter of the triangle: "+calc);
    }

    public static void trianglePrint(int height,int width){
        if(width%2==0||width>(height*2)){
            System.out.println("Error, The triangle cannot be printed");
            return;
        }
        if((width==3&&height!=2)||width==1){
            System.out.println("Error, The triangle cannot be printed");
            return;
        }
        int countHeight=0,calcHeight;
        for(int i=width;i>0;i-=2,countHeight++);
        height-=2;
        countHeight-=2;
        calcHeight=height/countHeight;
        for(int s=0;s<(width-1)/2;s++)//כמה רווח לעשות
        {
            System.out.print(' ');
        }
        System.out.print('*');
        System.out.println();
        for(int i=0,w=3;i<countHeight;i++,w+=2)//כמה קבוצות יש
        {
            if(i==0){
                calcHeight+=height%countHeight;
            }
            else{
                calcHeight=height/countHeight;
            }
            for(int j=0;j<calcHeight;j++) //כמה יש בכל קבוצה
            {
                for(int s=0;s<(width-w)/2;s++)//כמה רווח לעשות
                {
                    System.out.print(' ');
                }
                for (int z = 0; z < w; z++) //כמה כוביות להדפיס
                {
                    System.out.print('*');
                }
                System.out.println();
            }
        }
        for(int i=0;i<width;i++){
            System.out.print('*');
        }
        System.out.println();
    }

    public static void menu() {
        Scanner in = new Scanner(System.in);
        int choice;
        double height, width;
        boolean show = true;
        while (show) {
            System.out.println("Enter 1 to build a rectangular tower\nEnter 2 to build a triangular tower\nEnter 3 to exit");
            choice = in.nextInt();
            switch (choice) {
                case 1:
                    System.out.println("enter height");
                    height = in.nextDouble();
                    System.out.println("enter width");
                    width = in.nextDouble();
                    square(height, width);
                    break;
                case 2:
                    System.out.println("enter height");
                    height = in.nextDouble();
                    System.out.println("enter width");
                    width = in.nextDouble();
                    triangular(height, width);
                    break;
                case 3:
                    show=false;
                    break;
            }
        }
    }


    public static void main(String[] args) {
	menu();
//        int width=5,height=4;
//        int countHeight=0,calcHeight;
//        for(int i=width;i>0;i-=2,countHeight++);
//        System.out.println("countHeight"+countHeight);
//        height-=2;
//        countHeight-=2;
//        calcHeight=height/countHeight;
//        for(int i=0,w=3;i<countHeight;i++,w+=2)//כמה קבוצות יש
//        {
//            if(i==0){
//                calcHeight+=height%countHeight;
//            }
//            else{
//                calcHeight=height/countHeight;
//            }
//            for(int j=0;j<calcHeight;j++) //כמה יש בכל קבוצה
//            {
//                for(int s=0;s<(width-w)/2;s++){
//                    System.out.print(' ');
//                }
//                for (int z = 0; z < w; z++) //כמה כוביות להדפיס
//                {
//                    System.out.print('*');
//                }
//                System.out.println();
//            }
//        }
    }
    }

