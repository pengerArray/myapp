package com.skyeye.eve.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface SmProjectPageModeDao {

	public List<Map<String, Object>> queryProPageModeMationByPageIdList(Map<String, Object> map) throws Exception;

	public int deletePageModelMationListByPageId(Map<String, Object> map) throws Exception;

	public int editProPageModeMationByPageIdList(List<Map<String, Object>> beans) throws Exception;

	public List<Map<String, Object>> queryPropertyListByMemberId(Map<String, Object> map) throws Exception;

	public List<Map<String, Object>> queryPropertyValuesListByPropertyId(Map<String, Object> map) throws Exception;

}
