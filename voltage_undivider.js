module.exports = function(RED)
{
  "use strict";
//Licensed under the Apache License, Version 2.0
// 2018 David L Burrows
//Contact me @ https://github.com/meeki007
//or meeki007@gmail.com

  function voltage_undivider(config)
  {
    RED.nodes.createNode(this, config);
    var node = this;

    // config
    this.property = config.property||"payload";
    this.Voltage_Input = config.Voltage_Input || "V-Volts";
    this.Resistor_1Types = config.Resistor_1Types || "Ω-Ohm";
    this.Resistor_1 = Number(config.Resistor_1 || 1);
    this.Resistor_2Types = config.Resistor_2Types || "Ω-Ohm";
    this.Resistor_2 = Number(config.Resistor_2 || 1);
    this.Voltage_Output = config.Voltage_Output || "V-Volts";
    this.Round_Output = config.Round_Output || "Do_Not_Round";

    //clear status icon
    node.status({});

    this.on("input", function(msg)
    {
      //clear status icon
      node.status({});

      // if property of msg.* is not filled then set to msg.payload
      if (this.property == undefined)
      {
        return this.error("msg property was not set. Please set msg propery to a non null value", msg);
      }

      //get the voltage value the user chose to pass with msg.*
      //get imput voltage
      var voltage_in = RED.util.getMessageProperty(msg,node.property);


      //Make sure msg.payload is a number!!
      if( isNaN(voltage_in) || !isFinite(voltage_in) )
      {
        //noticed it was not a number try to change it to number
        voltage_in = Number(voltage_in)
      }

      //If its still not a number
      if( isNaN(voltage_in) || !isFinite(voltage_in) )
      {
        //send all msg along even if it faild a check
        RED.util.setMessageProperty(msg,node.property,voltage_in);
        node.send(msg);
        return this.error("Voltage into this node as msg.payload is not numeric! Please only send it numbers", msg);
      }

      //make sure resistor2 is not 0. tho not devide by zero
      //make sure value is a number
      //make sure value is not less than 0
      if( isNaN(this.Resistor_2) || !isFinite(this.Resistor_2) )
      {
       node.send(msg);
       return this.error("resistor_2 is not numeric! Please use numbers not letters", msg);
      }
      else if( this.Resistor_2 <= 0 )
      {
        node.send(msg);
        return this.error("resistor_2 must be greater than zero", msg);
      }
      //make sure resistor1 is not 0. tho not devide by zero
      //make sure value is a number
      //make sure value is not less than 0
      if( isNaN(this.Resistor_1) || !isFinite(this.Resistor_1) )
      {
        node.send(msg);
        return this.error("resistor_1 is not numeric! Please use numbers not letters", msg);
      }
      else if( this.Resistor_1 <= 0 )
      {
        node.send(msg);
        return this.error("resistor_1 must be greater than zero", msg);
      }

      else
      {
        //stop timmer for auto clear notifications after 3 seconds if new msg arrives
        clearTimeout(timmerClear);

        //calculate original voltage type into V-Volts
        var status_v_type_in = "undefined";
        var voltagein_convertedtoVoltageType = 0;

        switch (this.Voltage_Input)
        {
          case "µV-microvolts":
          voltagein_convertedtoVoltageType = voltage_in / 1000000;
          status_v_type_in = "µV";
          break;

          case "mV-millivolts":
          voltagein_convertedtoVoltageType = voltage_in / 1000;
          status_v_type_in = "mV";
          break;

          case "V-Volts":
          voltagein_convertedtoVoltageType = voltage_in;
          status_v_type_in = "V";
          break;

          case "kV-kilovolts":
          voltagein_convertedtoVoltageType = voltage_in * 1000;
          status_v_type_in = "kV";
          break;

          case "MV-megavolts":
          voltagein_convertedtoVoltageType = voltage_in * 1000000;
          status_v_type_in = "MV";
          break;
        }

        // calculate resistor_1 resistance type into Ω-Ohm
        var resistor_1_convertedtoOhms = 1;
        switch (this.Resistor_1Types)
        {
          case "µΩ-Microohm":
          resistor_1_convertedtoOhms = this.Resistor_1 / 1000000;
          break;

          case "mΩ-Milliohm":
          resistor_1_convertedtoOhms = this.Resistor_1 / 1000;
          break;

          case "Ω-Ohm":
          resistor_1_convertedtoOhms = this.Resistor_1;
          break;

          case "kΩ-Kiloohm":
          resistor_1_convertedtoOhms = this.Resistor_1 * 1000;
          break;

          case "MΩ-Megaohm":
          resistor_1_convertedtoOhms = this.Resistor_1 * 1000000;
          break;
        }

        // calculate resistor_2 resistance type into Ω-Ohm
        var resistor_2_convertedtoOhms = 1;
        switch (this.Resistor_2Types)
        {
          case "µΩ-Microohm":
          resistor_2_convertedtoOhms = this.Resistor_2 / 1000000;
          break;

          case "mΩ-Milliohm":
          resistor_2_convertedtoOhms = this.Resistor_2 / 1000;
          break;

          case "Ω-Ohm":
          resistor_2_convertedtoOhms = this.Resistor_2;
          break;

          case "kΩ-Kiloohm":
          resistor_2_convertedtoOhms = this.Resistor_2 * 1000;
          break;

          case "MΩ-Megaohm":
          resistor_2_convertedtoOhms = this.Resistor_2 * 1000000;
          break;
        }


        //voltage un-devider
        // = (voltage_source / resistor_2) * (resistor_1 + resistor_2)
        var voltage_out = (voltagein_convertedtoVoltageType / resistor_2_convertedtoOhms) * (resistor_1_convertedtoOhms + resistor_2_convertedtoOhms);

        //calculate voltage.out into user pref
        var voltageout_convertedtoUserPref = 0;
        var status_v_type_out = "undefined";
        switch (this.Voltage_Output)
        {
          case "µV-microvolts":
          voltageout_convertedtoUserPref = voltage_out * 1000000;
          status_v_type_out = "µV";
          break;

          case "mV-millivolts":
          voltageout_convertedtoUserPref = voltage_out * 1000;
          status_v_type_out = "mV";
          break;

          case "V-Volts":
          voltageout_convertedtoUserPref = voltage_out;
          status_v_type_out = "V";
          break;

          case "kV-kilovolts":
          voltageout_convertedtoUserPref = voltage_out / 1000;
          status_v_type_out = "kV";
          break;

          case "MV-megavolts":
          voltageout_convertedtoUserPref = voltage_out / 1000000;
          status_v_type_out = "MV";
          break;
        }

        //round? voltageout_convertedtoUserPref
        var round = 0;
        switch (this.Round_Output)
        {
          case "Do_Not_Round":
          round = voltageout_convertedtoUserPref;
          break;

          case "Ones":
          round = Math.round(voltageout_convertedtoUserPref * 1) / 1;
          break;

          case "Tenths":
          round = Math.round(voltageout_convertedtoUserPref * 10) / 10;
          break;

          case "Hundredths":
          round = Math.round(voltageout_convertedtoUserPref * 100) / 100;
          break;

          case "Thousandths":
          round = Math.round(voltageout_convertedtoUserPref * 1000) / 1000;
          break;

          case "TenThousandths":
          round = Math.round(voltageout_convertedtoUserPref * 10000) / 10000;
          break;

          case "HundredThousandths":
          round = Math.round(voltageout_convertedtoUserPref * 100000) / 100000;
          break;

          case "Millionths":
          round = Math.round(voltageout_convertedtoUserPref * 1000000) / 1000000;
          break;
        }

        //Function to Clear user notices
        var status_clear = function()
        {
          //clear status icon
          node.status({});
        };

        //Function show voltage in and out
        var status_voltage = function()
        {
          node.status(
          {
            fill: 'blue',
            shape: 'dot',
            text: voltage_in + status_v_type_in + ' --> ' + round + status_v_type_out
          });
        };
        //sent status msg
        var timmerVoltage = setTimeout(status_voltage, 0);
        // end status msg after 3 seconds
        var timmerClear = setTimeout(status_clear, 5000);

        //set msg.* out
        RED.util.setMessageProperty(msg,node.property,round);
        //send the payload
        node.send(msg);


      }
    });
  }

  RED.nodes.registerType("voltage_undivider", voltage_undivider);
};
