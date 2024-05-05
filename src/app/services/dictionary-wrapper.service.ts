import { UtilsService } from './utils.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { MathS } from '../classes/math-s';
import { IIOPolicy } from 'interfaces/iserver-manager';
import { VerificationService } from './verification.service';
import { IBranchState, ICustomerType, IInvoiceType, IOffering, IOfferingUnit, IOwnershipType, IWaterSource } from 'interfaces/i-branch';

@Injectable({
  providedIn: 'root'
})
export class DictionaryWrapperService {

  constructor(
    public utilsService: UtilsService,
    private verificationService: VerificationService
  ) { }

  private provinceDictionary: any = [];
  private regionDictionary: any = [];
  private zoneDictionary: any = [];
  private provinceHierarchy: any = [];
  private zoneBoundDictionary: any = [];
  private offeringUnit: IOfferingUnit[] = [];
  private invoiceType: IInvoiceType[] = [];
  private offering: IOffering[] = [];
  private countryDictionary: any = [];
  private authLev1Dictionary: any = [];
  private userActivationLogTypes: any = [];
  private authLev2Dictionary: any = [];
  private authLev3Dictionary: any = [];
  private authLev4Dictionary: any = [];
  private userAllDictionary: any = [];
  private trackingStatesDictionary: any = [];
  private periodKindDictionary: any = [];
  private qotrDictionary: any = [];
  private roleDictionary: any = [];
  private karbariCodeDictionary: any = [];
  private traverseDifferentialDictionary: any = [];
  private imageAttributionAllDictionary: any = [];
  private counterReportDictionary: any = [];
  private counterStateDictionary: any = [];
  private guildDictionary: any = [];
  private ownershipType: IOwnershipType[] = [];
  private branchState: IBranchState[] = [];
  private customerType: ICustomerType[] = [];
  private waterSource: IWaterSource[] = [];
  private iOPolicy: IIOPolicy = {
    id: null,
    inputExtensions: '',
    contentType: '',
    inputMaxSizeKb: null,
    inputMaxCountPerUser: null,
    inputMaxCountPerDay: null,
    outputMaxCountPerUser: null,
    outputMaxCountPerDay: null,
  };

  private counterReportByZoneDictionary = {
    dictionary: null,
    zoneId: null
  };
  private userCounterReadersByZoneDictionary = {
    dictionary: null,
    zoneId: null
  };
  private readingConfigDefaultByZoneDictionary = {
    dictionary: null,
    zoneId: null
  };
  private fragmentMasterByZoneDictionary = {
    dictionary: null,
    zoneId: null
  };
  private fragmentMasterInZonesDictionary = {
    dictionary: null,
    zoneId: null
  };
  private counterStateByZoneIdDictionary = {
    dictionary: null,
    zoneId: null
  }
  private counterStateForModifyDictionary = {
    dictionary: null,
    zoneId: null
  }
  private counterStateByCodeDictionary = {
    dictionary: null,
    zoneId: null
  }
  private counterStateByCodeShowAllDictionary = {
    dictionary: null,
    zoneId: null
  }
  private counterStateByZoneShowAllDictionary = {
    dictionary: null,
    zoneId: null
  }
  private readingPeriodDictionary = {
    dictionary: null,
    kindId: null
  }
  private readingPeriodDictionaryByZoneAndKind = {
    dictionary: null,
    kindId: null,
    zoneId: null
  }

  async getkarbariCodeDictionary(): Promise<any> {
    if (!MathS.isNull(this.karbariCodeDictionary))
      return this.karbariCodeDictionary;
    const res = this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.KarbariDictionaryCode);
    this.setKarbariDictionaryCode(res);
    return this.karbariCodeDictionary;
  }
  async getProvinceDictionary(): Promise<any> {
    if (!MathS.isNull(this.provinceDictionary))
      return this.provinceDictionary;
    const res = this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.ProvinceDICTIONARY);
    this.setProvinceDictionary(res);
    return this.provinceDictionary;
  }
  getRegionDictionary(): Promise<any> {
    if (!MathS.isNull(this.regionDictionary))
      return this.regionDictionary;
    const res = this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.RegionDICTIONARY);
    this.setRegionDictionary(res);
    return this.regionDictionary;
  }
  async getZoneDictionary(): Promise<any> {
    if (!MathS.isNull(this.zoneDictionary))
      return this.zoneDictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.ZoneDICTIONARY);
    this.setZoneDictionary(res);
    return this.zoneDictionary;
  }
  async getCountryDictionary(): Promise<any> {
    if (!MathS.isNull(this.countryDictionary))
      return this.countryDictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.CountryDICTIONARY);
    this.setCountryDictionary(res);
    return this.countryDictionary;
  }
  async getUserActivationLogTypesDictionary(): Promise<any> {
    if (!MathS.isNull(this.userActivationLogTypes))
      return this.userActivationLogTypes;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.requestLogUserActivationDictionary);
    this.setUserActivationLogTypes(res);
    return this.userActivationLogTypes;
  }
  async getUserAllDictionary(): Promise<any> {
    if (!MathS.isNull(this.userAllDictionary))
      return this.userAllDictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.userAllDictionary);
    this.setUserAllDictionary(res);
    return this.userAllDictionary;
  }
  async getAuthLev1Dictionary(): Promise<any> {
    if (!MathS.isNull(this.authLev1Dictionary))
      return this.authLev1Dictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.AuthLevel1DICTIONARY);
    this.setAuthLev1Dictionary(res);
    return this.authLev1Dictionary;
  }
  async getAuthLev2Dictionary(): Promise<any> {
    if (!MathS.isNull(this.authLev2Dictionary))
      return this.authLev2Dictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.AuthLevel2DICTIONARY);
    this.setAuthLev2Dictionary(res);
    return this.authLev2Dictionary;
  }
  async getAuthLev3Dictionary(): Promise<any> {
    if (!MathS.isNull(this.authLev3Dictionary))
      return this.authLev3Dictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.AuthLevel3DICTIONARY);
    this.setAuthLev3Dictionary(res);
    return this.authLev3Dictionary;
  }
  async getAuthLev4Dictionary(): Promise<any> {
    if (!MathS.isNull(this.authLev4Dictionary))
      return this.authLev4Dictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.AuthLevel4DICTIONARY);
    this.setAuthLev4Dictionary(res);
    return this.authLev4Dictionary;
  }
  async getImageAttrAllDictionary(): Promise<any> {
    if (!MathS.isNull(this.imageAttributionAllDictionary))
      return this.imageAttributionAllDictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.imageAttributionGet);
    this.setImgAttributionDictionary(res);
    return this.imageAttributionAllDictionary;
  }
  async getTrackingStatesDictionary(): Promise<any> {
    if (!MathS.isNull(this.trackingStatesDictionary))
      return this.trackingStatesDictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.trackingStatesDictionary);
    this.setTrackingStatesDictionary(res);
    return this.trackingStatesDictionary;
  }
  async getTraverseDifferentialDictionary(): Promise<any> {
    if (!MathS.isNull(this.traverseDifferentialDictionary))
      return this.traverseDifferentialDictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.ListTraverseDifferentialDictionary);
    this.setTraverseDiffDictionary(res);
    return this.traverseDifferentialDictionary;
  }
  async getGuildDictionary(canRefresh: boolean): Promise<any> {
    if (!MathS.isNull(this.guildDictionary) && !canRefresh)
      return this.guildDictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.GuildManagerAll);
    this.setGuildDictionary(res);
    return this.guildDictionary;
  }
  async getOwnershipTypeDictionary(canRefresh: boolean): Promise<any> {
    if (!MathS.isNull(this.ownershipType) && !canRefresh)
      return this.ownershipType;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.ownershipTypeGet);
    this.setOwnershipTypeDictionary(res);
    return this.ownershipType;
  }
  async getBranchStateDictionary(canRefresh: boolean): Promise<any> {
    if (!MathS.isNull(this.branchState) && !canRefresh)
      return this.branchState;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.branchStateGet);
    this.setBranchStateDictionary(res);
    return this.branchState;
  }
  async getCustomerTypeDictionary(canRefresh: boolean): Promise<any> {
    if (!MathS.isNull(this.customerType) && !canRefresh)
      return this.customerType;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.customerTypeGet);
    this.setCustomerTypeDictionary(res);
    return this.customerType;
  }
  async getWaterSourceDictionary(canRefresh: boolean): Promise<any> {
    if (!MathS.isNull(this.waterSource) && !canRefresh)
      return this.waterSource;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.waterSourceGet);
    this.setWaterSourceDictionary(res);
    return this.waterSource;
  }
  async getCounterReportDictionary(): Promise<any> {
    if (!MathS.isNull(this.counterReportDictionary))
      return this.counterReportDictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.CounterReportDICTIONARY);
    this.setCounterReportDictionary(res);
    return this.counterReportDictionary;
  }
  async getCounterReportByZoneIdDictionary(zoneId: number): Promise<any> {
    if (this.counterReportByZoneDictionary.zoneId == zoneId && !MathS.isNull(this.counterReportByZoneDictionary.dictionary))
      return this.counterReportByZoneDictionary.dictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.CounterReportByZoneIdDICTIONARY, zoneId);
    this.setCounterReportByZoneDictionary(res, zoneId);
    return res;
  }
  getUserCounterReaderDictionary = async (zoneId: number): Promise<any> => {
    if (this.userCounterReadersByZoneDictionary.zoneId == zoneId && !MathS.isNull(this.userCounterReadersByZoneDictionary.dictionary))
      return this.userCounterReadersByZoneDictionary.dictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.counterReadersByZoneId, zoneId);
    this.setUserCounterReadersByZoneDictionary(res, zoneId);
    return res;
  }
  getReadingConfigDefaultByZoneIdDictionary = async (zoneId: number): Promise<any> => {
    if (this.readingConfigDefaultByZoneDictionary.zoneId == zoneId && !MathS.isNull(this.readingConfigDefaultByZoneDictionary.dictionary))
      return this.readingConfigDefaultByZoneDictionary.dictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.readingConfigDefaultByZoneId, zoneId);
    this.setReadingConfigDefaultByZoneDictionary(res, zoneId);
    return res;
  }
  getIOPolicy = async (canRefresh: boolean): Promise<any> => {
    if (!MathS.isNull(this.iOPolicy.id) && !canRefresh)
      return this.iOPolicy;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.GetIOPolicy);
    this.setIOPolicy(res);
    return res;
  }
  getFragmentMasterByZoneIdDictionary = async (zoneId: number): Promise<any> => {
    if (this.fragmentMasterByZoneDictionary.zoneId == zoneId && !MathS.isNull(this.fragmentMasterByZoneDictionary.dictionary))
      return this.fragmentMasterByZoneDictionary.dictionary;

    const res = await this.utilsService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.fragmentMasterInZone, zoneId);
    this.setFragmentMasterByZoneDictionary(res, zoneId);
    return res;
  }
  // Without Caching
  getFragmentMasterInZonesDictionary = async (zoneIds: number[]): Promise<any> => {
    return await this.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.fragmentMasterInZones, { zoneIds: zoneIds });
  }
  async getCounterStateDictionary(): Promise<any> {
    if (!MathS.isNull(this.counterStateDictionary))
      return this.counterStateDictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.counterStateDictionary);
    this.setCounterStateDictionary(res);
    return this.counterStateDictionary;
  }
  async getCounterStateForModifyDictionary(zoneId: number): Promise<any> {
    if (this.counterStateForModifyDictionary.zoneId == zoneId && !MathS.isNull(this.counterStateForModifyDictionary.dictionary))
      return this.counterStateForModifyDictionary.dictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.counterStateDictionaryForModify, zoneId);
    this.setCounterStateForModifyDictionary(res, zoneId);
    return res;
  }
  async getCounterStateByZoneIdDictionary(zoneId: number): Promise<any> {
    if (this.counterStateByZoneIdDictionary.zoneId == zoneId && !MathS.isNull(this.counterStateByZoneIdDictionary.dictionary))
      return this.counterStateByZoneIdDictionary.dictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.counterStateDictionaryByZoneId, zoneId);
    this.setCounterStateByZoneIdDictionary(res, zoneId);
    return res;
  }
  async getCounterStateByCodeShowAllDictionary(zoneId: number): Promise<any> {
    if (this.counterStateByCodeShowAllDictionary.zoneId == zoneId && !MathS.isNull(this.counterStateByCodeShowAllDictionary.dictionary))
      return this.counterStateByCodeShowAllDictionary.dictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.counterStateDictionaryByCode, zoneId + '?showAll=true');
    this.setCounterStateByCodeShowAllDictionary(res, zoneId);
    return res;
  }
  async getCounterStateByZoneShowAllDictionary(zoneId: number): Promise<any> {
    if (this.counterStateByZoneShowAllDictionary.zoneId == zoneId && !MathS.isNull(this.counterStateByZoneShowAllDictionary.dictionary))
      return this.counterStateByZoneShowAllDictionary.dictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.counterStateDictionaryByZoneId, zoneId + '?showAll=true');
    this.setCounterStateByZoneShowAllDictionary(res, zoneId);
    return res;
  }
  async getCounterStateByCodeDictionary(zoneId: number): Promise<any> {
    if (this.counterStateByCodeDictionary.zoneId == zoneId && !MathS.isNull(this.counterStateByCodeDictionary.dictionary))
      return this.counterStateByCodeDictionary.dictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.counterStateDictionaryByCode, zoneId);
    this.setCounterStateByCodeDictionary(res, zoneId);
    return res;
  }
  async getPeriodKindDictionary(): Promise<any> {
    if (!MathS.isNull(this.periodKindDictionary))
      return this.periodKindDictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.readingPeriodKindDictionary);
    this.setPeriodKindDictionary(res);
    return this.periodKindDictionary;
  }
  getReadingPeriodDictionary = async (kindId: string): Promise<any> => {
    if (this.readingPeriodDictionary.kindId == kindId && !MathS.isNull(this.readingPeriodDictionary.dictionary))
      return this.readingPeriodDictionary.dictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.readingPeriodByKindDictionary, kindId);
    this.setReadingPeriodDictionary(res, +kindId);
    return res;
  }
  getReadingPeriodDictionaryByZoneAndKind = async (zoneId: number, kindId: number): Promise<any> => {
    if (!this.verificationService.verificationZoneAndKind(zoneId, kindId))
      return [];
    if (this.readingPeriodDictionaryByZoneAndKind.kindId == kindId && this.readingPeriodDictionaryByZoneAndKind.zoneId == zoneId && !MathS.isNull(this.readingPeriodDictionaryByZoneAndKind.dictionary))
      return this.readingPeriodDictionaryByZoneAndKind.dictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSourceByQuoteTriple(ENInterfaces.readingPeriodDictionaryByZoneIdAndKindId, zoneId, kindId);
    this.setReadingPeriodDictionaryByZoneAndKind(res, zoneId, kindId);
    return res;

  }
  async getQotrDictionary(): Promise<any> {
    if (!MathS.isNull(this.qotrDictionary))
      return this.qotrDictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.QotrDictionary);
    this.setQotrDictionary(res);
    return this.qotrDictionary;
  }
  async getRoleDictionary(): Promise<any> {
    if (!MathS.isNull(this.roleDictionary))
      return this.roleDictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.RoleDICTIONARY);
    this.setRoleDictionary(res);
    return this.roleDictionary;
  }
  async getOfferingUnit(): Promise<any> {
    if (!MathS.isNull(this.offeringUnit))
      return this.offeringUnit;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.offeringUnitGet);
    this.setOfferingUnit(res);
    return this.offeringUnit;
  }
  async getInvoiceType(canRefresh: boolean): Promise<any> {
    if (!MathS.isNull(this.invoiceType) && !canRefresh)
      return this.invoiceType;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.invoiceTypeAll);
    this.setInvoiceType(res);
    return this.invoiceType;
  }
  async getOffering(): Promise<any> {
    if (!MathS.isNull(this.offering))
      return this.offering;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.offeringGet);
    this.setOffering(res);
    return this.offering;
  }
  async getZoneBoundDictionary(): Promise<any> {
    if (!MathS.isNull(this.zoneBoundDictionary))
      return this.zoneBoundDictionary;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.ZoneBoundDICTIONARY);
    this.setZoneBoundDictionary(res);
    return this.zoneBoundDictionary;
  }
  async getProvinceHierarchy(): Promise<any> {
    if (!MathS.isNull(this.provinceHierarchy))
      return this.provinceHierarchy;
    const res = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.GetProvinceHierarchyPrimeNg);
    this.setProvinceHierarchy([res]);
    return this.provinceHierarchy;
  }


  private setKarbariDictionaryCode(v: any) {
    this.karbariCodeDictionary = v;
  }
  private setProvinceDictionary(v: any) {
    this.provinceDictionary = v;
  }
  private setRegionDictionary(v: any) {
    this.regionDictionary = v;
  }
  private setZoneDictionary(v: any) {
    this.zoneDictionary = v;
  }
  private setZoneBoundDictionary(v: any) {
    this.zoneBoundDictionary = v;
  }
  private setOfferingUnit(v: any) {
    this.offeringUnit = v;
  }
  private setInvoiceType(v: any) {
    this.invoiceType = v;
  }
  private setOffering(v: any) {
    this.offering = v;
  }
  private setProvinceHierarchy(v: any) {
    this.provinceHierarchy = v;
  }
  private setCountryDictionary(v: any) {
    this.countryDictionary = v;
  }
  private setAuthLev1Dictionary(v: any) {
    this.authLev1Dictionary = v;
  }
  private setUserActivationLogTypes(v: any) {
    this.userActivationLogTypes = v;
  }
  private setAuthLev2Dictionary(v: any) {
    this.authLev2Dictionary = v;
  }
  private setAuthLev3Dictionary(v: any) {
    this.authLev3Dictionary = v;
  }
  private setAuthLev4Dictionary(v: any) {
    this.authLev4Dictionary = v;
  }
  private setUserAllDictionary(v: any) {
    this.userAllDictionary = v;
  }
  private setImgAttributionDictionary(v: any) {
    this.imageAttributionAllDictionary = v;
  }
  private setTrackingStatesDictionary(v: any) {
    this.trackingStatesDictionary = v;
  }
  private setCounterReportDictionary(v: any) {
    this.counterReportDictionary = v;
  }
  private setCounterReportByZoneDictionary(v: any, id: number) {
    this.counterReportByZoneDictionary.dictionary = v;
    this.counterReportByZoneDictionary.zoneId = id;
  }
  private setReadingConfigDefaultByZoneDictionary(v: any, id: number) {
    this.readingConfigDefaultByZoneDictionary.dictionary = v;
    this.readingConfigDefaultByZoneDictionary.zoneId = id;
  }
  private setIOPolicy(v: any) {
    this.iOPolicy = v;
  }
  private setUserCounterReadersByZoneDictionary(v: any, id: number) {
    this.userCounterReadersByZoneDictionary.dictionary = v;
    this.userCounterReadersByZoneDictionary.zoneId = id;
  }
  private setFragmentMasterByZoneDictionary(v: any, id: number) {
    this.fragmentMasterByZoneDictionary.dictionary = v;
    this.fragmentMasterByZoneDictionary.zoneId = id;
  }
  private setCounterStateDictionary(v: any) {
    this.counterStateDictionary = v;
  }
  private setCounterStateByZoneIdDictionary(v: any, id: number) {
    this.counterStateByZoneIdDictionary.dictionary = v;
    this.counterStateByZoneIdDictionary.zoneId = id;
  }
  private setCounterStateByZoneShowAllDictionary(v: any, id: number) {
    this.counterStateByZoneShowAllDictionary.dictionary = v;
    this.counterStateByZoneShowAllDictionary.zoneId = id;
  }
  private setCounterStateForModifyDictionary(v: any, id: number) {
    this.counterStateForModifyDictionary.dictionary = v;
    this.counterStateForModifyDictionary.zoneId = id;
  }
  private setCounterStateByCodeDictionary(v: any, id: number) {
    this.counterStateByCodeDictionary.dictionary = v;
    this.counterStateByCodeDictionary.zoneId = id;
  }
  private setReadingPeriodDictionary(v: any, id: number) {
    this.readingPeriodDictionary.dictionary = v;
    this.readingPeriodDictionary.kindId = id;
  }
  private setReadingPeriodDictionaryByZoneAndKind(v: any, zone: number, kind: number) {
    this.readingPeriodDictionaryByZoneAndKind.dictionary = v;
    this.readingPeriodDictionaryByZoneAndKind.kindId = kind;
    this.readingPeriodDictionaryByZoneAndKind.zoneId = zone;
  }
  private setCounterStateByCodeShowAllDictionary(v: any, id: number) {
    this.counterStateByCodeShowAllDictionary.dictionary = v;
    this.counterStateByCodeShowAllDictionary.zoneId = id;
  }
  private setPeriodKindDictionary(v: any) {
    this.periodKindDictionary = v;
  }
  private setQotrDictionary(v: any) {
    this.qotrDictionary = v;
  }
  private setRoleDictionary(v: any) {
    this.roleDictionary = v;
  }
  private setTraverseDiffDictionary(v: any) {
    this.traverseDifferentialDictionary = v;
  }
  private setGuildDictionary(v: any) {
    this.guildDictionary = v;
  }
  private setOwnershipTypeDictionary(v: any) {
    this.ownershipType = v;
  }
  private setBranchStateDictionary(v: any) {
    this.branchState = v;
  }
  private setCustomerTypeDictionary(v: any) {
    this.customerType = v;
  }
  private setWaterSourceDictionary(v: any) {
    this.waterSource = v;
  }

  cleanDictionaries = () => {
    this.ownershipType = [];
    this.waterSource = [];
    this.customerType = [];
    this.branchState = [];
    this.provinceDictionary = [];
    this.regionDictionary = [];
    this.zoneDictionary = [];
    this.offeringUnit = [];
    this.invoiceType = [];
    this.offering = [];
    this.zoneBoundDictionary = [];
    this.provinceHierarchy = [];
    this.countryDictionary = [];
    this.authLev1Dictionary = [];
    this.authLev2Dictionary = [];
    this.authLev3Dictionary = [];
    this.authLev4Dictionary = [];
    this.counterReportDictionary = [];
    this.periodKindDictionary = [];
    this.counterStateDictionary = [];
    this.qotrDictionary = [];
    this.roleDictionary = [];
    this.karbariCodeDictionary = [];
    this.traverseDifferentialDictionary = [];
    this.guildDictionary = [];
    this.counterReportByZoneDictionary.dictionary = [];
    this.counterReportByZoneDictionary.zoneId = null;
    this.iOPolicy.id = null;
    this.readingConfigDefaultByZoneDictionary.dictionary = [];
    this.readingConfigDefaultByZoneDictionary.zoneId = null;
    this.userCounterReadersByZoneDictionary.dictionary = [];
    this.userCounterReadersByZoneDictionary.zoneId = null;
    this.fragmentMasterByZoneDictionary.dictionary = [];
    this.fragmentMasterByZoneDictionary.zoneId = null;
    this.counterStateByZoneIdDictionary.dictionary = [];
    this.counterStateByZoneIdDictionary.zoneId = null;
    this.counterStateByCodeDictionary.dictionary = [];
    this.counterStateByCodeDictionary.zoneId = null;
    this.userActivationLogTypes = [];
    this.userAllDictionary = [];
    this.counterStateForModifyDictionary.dictionary = [];
    this.counterStateForModifyDictionary.zoneId = null;
    this.readingPeriodDictionary.dictionary = [];
    this.readingPeriodDictionary.kindId = null;
    this.readingPeriodDictionaryByZoneAndKind.dictionary = [];
    this.readingPeriodDictionaryByZoneAndKind.kindId = null;
    this.readingPeriodDictionaryByZoneAndKind.zoneId = null;
    this.counterStateByCodeShowAllDictionary.dictionary = [];
    this.counterStateByCodeShowAllDictionary.zoneId = null;
    this.counterStateByZoneShowAllDictionary.dictionary = [];
    this.counterStateByZoneShowAllDictionary.zoneId = null;

  }
  cleanSingleDictionary = (dicName: string) => {
    this[dicName] = [];
  }
}
