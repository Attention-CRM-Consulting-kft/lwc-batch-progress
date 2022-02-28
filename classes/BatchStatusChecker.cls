/**
 * Created by Misi on 10/22/2021.
 */

public with sharing class BatchStatusChecker {
    @AuraEnabled
    public static AsyncApexJob getBatchStatus(Id jobId){
        AsyncApexJob job = [SELECT Id,TotalJobItems,JobItemsProcessed,NumberOfErrors, Status FROM AsyncApexJob WHERE Id = :jobId];
        return job;
    }
}